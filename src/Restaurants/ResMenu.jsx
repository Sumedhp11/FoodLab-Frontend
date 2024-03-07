import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import Loader from "@/loader";
import vegIcon from "@/assets/veg-icon.png";
import nonvegIcon from "@/assets/non-veg icon.png";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getResMenu } from "./RestaurantsAPI";
import { debounce } from "lodash";
import { Minus, Plus } from "lucide-react";

// eslint-disable-next-line react/prop-types
const ResMenu = ({ resId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["resmenu", resId, searchQuery],
    queryFn: ({ pageParam = 0 }) =>
      getResMenu({ resId: resId, search: searchQuery, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.totalPages > lastPage.page) {
        return lastPage.page + 1;
      } else {
        return null;
      }
    },
  });

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
            page.menu.map((dish) => (
              <div
                key={dish._id}
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
                  <div className="absolute bottom-0 bg-green-700 w-full flex justify-center font-normal rounded-md cursor-pointer text-white">
                    Add to cart
                    <Minus />
                    <Plus />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div ref={ref}></div>
      </div>
    </>
  );
};

export default ResMenu;
