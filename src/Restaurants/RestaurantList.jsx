import { useState, useEffect, useMemo } from "react";
import NavBar from "@/components/NavBar";
import { useInView } from "react-intersection-observer";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getAllRestaurants } from "./RestaurantsAPI";
import Loader from "@/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Pencil, Timer, Trash2 } from "lucide-react";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  getAllFavourites,
  toggleFavRes,
} from "@/components/favourites/FavouritesAPI";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditRestaurant from "@/adminPages/RestaurantList/EditRestaurant";
import { deleteres } from "@/adminPages/AdminAPI";
import { Button } from "@/components/ui/button";
import AddRestaurant from "@/adminPages/RestaurantList/AddRestaurant";

const RestaurantList = () => {
  const queryClient = useQueryClient();
  const userId = localStorage.getItem("UserId");
  const isAdmin = localStorage.getItem("isAdmin");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: restaurants,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["restaurants", searchQuery],
    queryFn: ({ pageParam = 0, queryKey }) =>
      getAllRestaurants({ page: pageParam, search: queryKey[1] }),
    getNextPageParam: (lastPage) => {
      if (lastPage.totalPages > lastPage.currentPage) {
        return lastPage.currentPage + 1;
      } else {
        return null;
      }
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage]);

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
  const { data: favouritesData } = useQuery({
    queryKey: ["favrs"],
    queryFn: () => getAllFavourites({ userId }),
  });

  const favoriteRestaurantIds = favouritesData
    ? favouritesData.resId.map((item) => item?._id)
    : [];

  const { mutate } = useMutation({
    mutationFn: toggleFavRes,
    onSuccess: () => queryClient.invalidateQueries("restaurants"),
  });
  const handleFavRes = (resId) => {
    mutate({ userId: userId, resId: resId });
  };
  const { mutate: deleterestaurant } = useMutation({
    mutationFn: deleteres,
    onSuccess: () => queryClient.invalidateQueries("restaurants"),
  });
  const handleDeleleRes = (resId) => {
    deleterestaurant({ resId });
  };
  return (
    <div className=" min-h-screen ">
      <NavBar />
      <section className="w-full h-full flex justify-center">
        <div className="w-[80%] px-3 py-16 h-full">
          <div className="flex gap-3 my-3">
            <div>
              <Input
                onChange={handleSearchChange}
                value={searchQuery}
                placeholder="Search Restaurants"
                className="w-72 font-medium border-[0.8px] border-gray-600"
              />
            </div>
            {isAdmin === "true" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-700 hover:bg-green-800">
                    Add New Restaurant
                  </Button>
                </DialogTrigger>
                <DialogContent className=" h-fit overflow-auto max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Add Restaurant</DialogTitle>
                  </DialogHeader>
                  <AddRestaurant />
                </DialogContent>
              </Dialog>
            )}
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {restaurants?.pages.map((page) =>
                page?.restaurants?.map((restaurant) => {
                  const isFavorite = favoriteRestaurantIds.includes(
                    restaurant._id
                  );
                  return (
                    <div key={restaurant._id}>
                      <Card
                        className={`h-full shadow-lg shadow-gray-600 ${
                          restaurant.isdeleted
                            ? "bg-gray-300 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <div className="flex justify-between items-center px-2">
                          <div className="flex-grow-1">
                            <CardHeader className="flex justify-start items-center">
                              <CardTitle className="whitespace-nowrap overflow-hidden overflow-ellipsis py-2">
                                {restaurant?.name &&
                                (restaurant.name.split(" ").length > 1 ||
                                  restaurant.name.length > 5)
                                  ? `${restaurant.name.split(" ")[0]} ${
                                      restaurant.name.split(" ")[1]
                                        ? restaurant.name
                                            .split(" ")[1]
                                            .slice(0, 5)
                                        : ""
                                    }...`
                                  : restaurant.name}
                              </CardTitle>
                            </CardHeader>
                          </div>
                          <div className="flex items-center">
                            <button disabled={restaurant.isdeleted}>
                              <Heart
                                className={`h-6 w-6 ${
                                  !restaurant.isdeleted
                                    ? "cursor-pointer hover:scale-125"
                                    : null
                                } transition-transform duration-300  transform ${
                                  isFavorite
                                    ? "text-red-500  fill-current"
                                    : "text-black "
                                }`}
                                onClick={() => handleFavRes(restaurant._id)}
                              />
                            </button>
                          </div>
                        </div>

                        <CardContent
                          className={`flex flex-col ${
                            restaurant.isdeleted
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          <Link
                            to={
                              !restaurant.isdeleted
                                ? "/menu/" + restaurant?.id
                                : null
                            }
                          >
                            <div className="flex-shrink-0 h-48">
                              <img
                                className="object-cover w-full h-full"
                                src={
                                  import.meta.env
                                    .VITE_APP_CLOUDINARY_IMAGE_URL +
                                  restaurant.imageId
                                }
                                alt="res-logo"
                              />
                            </div>
                            <p className="text-base font-medium whitespace-nowrap overflow-hidden overflow-ellipsis my-1">
                              {restaurant?.cuisines.join(", ")}
                            </p>
                            <p className="my-1 text-base font-medium">
                              {restaurant?.costForTwo}
                            </p>
                            <div className="flex justify-between">
                              <span className="font-medium">
                                Total Rating: {restaurant?.totalRatings}
                              </span>
                              <span className="font-medium flex items-center gap-2">
                                <span>{restaurant?.avgRating}</span>
                                <span>
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    role="img"
                                    aria-hidden="true"
                                  >
                                    <circle
                                      cx="10"
                                      cy="10"
                                      r="9"
                                      fill="url(#gradient)"
                                    ></circle>
                                    <path
                                      d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                                      fill="white"
                                    ></path>
                                    <defs>
                                      <linearGradient
                                        id="gradient"
                                        x1="10"
                                        y1="1"
                                        x2="10"
                                        y2="19"
                                        gradientUnits="userSpaceOnUse"
                                      >
                                        <stop stopColor="#21973B"></stop>
                                        <stop
                                          offset="1"
                                          stopColor="#128540"
                                        ></stop>
                                      </linearGradient>
                                    </defs>
                                  </svg>
                                </span>
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <span className="font-medium ">
                                {restaurant?.slaString}
                              </span>
                              <span>
                                <Timer />
                              </span>
                            </div>
                          </Link>
                          {isAdmin === "true" && (
                            <div className="flex justify-between mt-3">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <button disabled={restaurant?.isdeleted}>
                                    <Pencil
                                      className={` ${
                                        !restaurant?.isdeleted
                                          ? "text-green-700 cursor-pointer"
                                          : "text-gray-600"
                                      }`}
                                      size={25}
                                    />
                                  </button>
                                </DialogTrigger>
                                <DialogContent className=" h-fit overflow-auto max-w-3xl">
                                  <DialogHeader>
                                    <DialogTitle>Edit Restaurant</DialogTitle>
                                  </DialogHeader>
                                  <EditRestaurant restaurant={restaurant} />
                                </DialogContent>
                              </Dialog>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <button disabled={restaurant.isdeleted}>
                                    <Trash2
                                      className={` ${
                                        !restaurant.isdeleted
                                          ? "cursor-pointer text-red-700"
                                          : "text-gray-600"
                                      }`}
                                      size={25}
                                    />
                                  </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you Sure?
                                    </AlertDialogTitle>
                                  </AlertDialogHeader>
                                  <AlertDialogDescription className="font-medium">
                                    You want to Delete {restaurant?.name}?
                                  </AlertDialogDescription>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-500 hover:bg-red-700"
                                      onClick={() =>
                                        handleDeleleRes(restaurant?._id)
                                      }
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  );
                })
              )}
            </div>
          )}
          <div ref={ref}></div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantList;
