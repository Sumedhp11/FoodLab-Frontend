import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import Loader from "@/loader";
import vegIcon from "@/assets/veg-icon.png";
import nonvegIcon from "@/assets/non-veg icon.png";
import { useInView } from "react-intersection-observer";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getResMenu } from "./RestaurantsAPI";
import { debounce } from "lodash";
import { Minus, Plus } from "lucide-react";
import { addtoCart, fetchCartById } from "@/cart/cartAPI";

// eslint-disable-next-line react/prop-types
const ResMenu = ({ resId }) => {
  const queryClient = useQueryClient();
  const userId = localStorage.getItem("UserId");
  const [searchQuery, setSearchQuery] = useState("");
  const { ref, inView } = useInView();
  const [cartItems, setCartItems] = useState([]);

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["resmenu", resId, searchQuery],
    queryFn: ({ pageParam = 0 }) =>
      getResMenu({ resId: resId, search: searchQuery, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.totalPages > lastPage.page ? lastPage.page + 1 : null,
  });

  const { data: cart, isSuccess } = useQuery({
    queryKey: ["cartItems"],
    queryFn: () => fetchCartById({ userId: userId }),
  });

  useEffect(() => {
    setCartItems(cart?.data);
  }, [isSuccess, setCartItems, cart?.data]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const debouncedFetchRestaurants = useMemo(
    () =>
      debounce((query) => {
        setSearchQuery(query);
      }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFetchRestaurants(query);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: addtoCart,
    onSuccess: () => {
      queryClient.invalidateQueries("cartItems");
    },
  });

  const handleAddToCart = (quantity, dishId) => {
    mutate({ userId, quantity, dishId });
  };

  const handleIncrement = (dishId) => {
    console.log(cartItems);
    const updatedCartItems = cartItems?.cartitems.map((item) =>
      item.dish._id === dishId ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCartItems(updatedCartItems);
    console.log(updatedCartItems);

    const updatedCartItem = updatedCartItems.find(
      (item) => item.dish._id === dishId
    );

    if (updatedCartItem) {
      mutate({ userId, quantity: updatedCartItem.quantity, dishId });
    }
  };

  const handleDecrement = (dishId) => {
    const updatedCartItems = cartItems?.cartitems.map((item) =>
      item.dish._id === dishId
        ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
        : item
    );

    setCartItems(updatedCartItems);

    const updatedCartItem = updatedCartItems.find(
      (item) => item.dish._id === dishId
    );

    if (updatedCartItem) {
      mutate({ userId, quantity: updatedCartItem.quantity, dishId });
    }
  };

  return (
    <>
      <div className="w-1/3">
        <Input
          value={searchQuery}
          className="font-medium border-[0.8px] border-gray-600 w-[70%]"
          placeholder="Search Dishes"
          onChange={handleSearchChange}
        />
      </div>
      <div className="w-full">
        <div className="space-y-3">
          {isLoading && <Loader />}
          {data?.pages.map((page) =>
            page.menu.map((dish) => {
              const cartItem = cartItems?.cartitems?.find((item) => {
                return item?.dish?._id === dish?._id;
              });

              const cartQuantity = cartItem ? cartItem.quantity : 0;

              return (
                <div
                  key={dish?._id}
                  className="border-[0.8px] border-gray-600 flex justify-between shadow-2xl py-2 rounded-lg w-full px-3 "
                >
                  <div className="justify-start w-1/2 px-2 space-y-2">
                    <p className="font-medium text-lg">{dish?.name}</p>
                    <p className="text-base font-medium text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis my-1">
                      {dish?.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {dish?.isVeg ? "Veg" : "Non-Veg"}
                      </span>
                      <span className="w-6 h-6 rounded-full">
                        <img src={dish?.isVeg ? vegIcon : nonvegIcon} alt="" />
                      </span>
                    </div>
                    <p className="font-medium">₹ {dish?.mrp / 100} </p>
                  </div>
                  <div className="h-32 w-32 relative">
                    <img
                      className="object-cover h-full w-full"
                      src={import.meta.env.VITE_APP_IMAGE_URL + dish?.image}
                      alt="res-logo"
                    />
                    {cartQuantity === 0 ? (
                      <button
                        onClick={() => handleAddToCart(1, dish._id)}
                        disabled={isPending}
                        className="absolute bottom-0 bg-green-700 w-full flex justify-center font-normal rounded-md cursor-pointer text-white"
                      >
                        {isPending ? "Adding..." : "Add to Cart"}
                      </button>
                    ) : (
                      <div className="absolute bottom-0 bg-green-700 w-full flex justify-between font-normal rounded-md cursor-pointer text-white">
                        <button onClick={() => handleDecrement(dish._id)}>
                          <Minus />
                        </button>
                        <span className="mx-2">{cartQuantity}</span>
                        <button onClick={() => handleIncrement(dish._id)}>
                          <Plus />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div ref={ref}></div>
      </div>
    </>
  );
};

export default ResMenu;
