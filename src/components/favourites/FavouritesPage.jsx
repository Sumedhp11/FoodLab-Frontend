import { Heart, Timer } from "lucide-react";
import NavBar from "../NavBar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllFavourites, toggleFavDish, toggleFavRes } from "./FavouritesAPI";
import { Button } from "../ui/button";
import Loader from "@/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const FavouritesPage = () => {
  const navigate = useNavigate();
  const [selectedFav, setselectedFav] = useState("restaurants");
  const userId = localStorage.getItem("UserId");
  const queryClient = useQueryClient();
  const { data: favs, isPending } = useQuery({
    queryKey: ["favs"],
    queryFn: () => getAllFavourites({ userId }),
  });

  const favoriteRestaurantIds = favs ? favs.resId.map((item) => item?._id) : [];
  const favDishes = favs ? favs.dishId.map((item) => item?._id) : [];
  const { mutate } = useMutation({
    mutationFn: toggleFavRes,
    onSuccess: () => queryClient.invalidateQueries("favs"),
  });
  const handleFavRes = (resId) => {
    mutate({ userId: userId, resId: resId });
  };
  const { mutate: addtofavDish } = useMutation({
    mutationFn: toggleFavDish,
    onSuccess: () => queryClient.invalidateQueries("favs"),
  });
  const handlefavDish = (dishId) => {
    addtofavDish({ userId: userId, dishId: dishId });
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <section className="w-full h-full flex flex-col justify-center items-center py-4">
        <h1 className="w-full text-center text-3xl font-medium my-3">
          Your Favs
        </h1>
        <div className="flex justify-start w-[80%] ">
          <Select onValueChange={(data) => setselectedFav(data)}>
            <SelectTrigger className="w-44 border border-black focus:border-none">
              <SelectValue placeholder={selectedFav} />
            </SelectTrigger>
            <SelectContent className="border border-black">
              <SelectItem
                value="dishes"
                className="border-b border-gray-400 font-medium cursor-pointer"
              >
                Dishes
              </SelectItem>
              <SelectItem
                value="restaurants"
                className="font-medium cursor-pointer"
              >
                Restaurants
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isPending ? (
          <Loader />
        ) : (
          <div className="w-[80%]  py-12 grid grid-cols-12  ">
            {selectedFav === "restaurants" ? (
              favs.resId.length > 0 ? (
                favs.resId?.map((favres) => {
                  const isFavorite = favoriteRestaurantIds.includes(favres._id);
                  return (
                    <Card
                      className="col-span-3 border border-black shadow-lg shadow-gray-600 w-[80%]"
                      key={favres._id}
                    >
                      <div className="flex justify-between items-center px-2">
                        <div className="flex-grow-1">
                          <CardHeader className="flex justify-start items-center">
                            <CardTitle className="whitespace-nowrap overflow-hidden overflow-ellipsis py-2">
                              {favres?.name &&
                              (favres.name.split(" ").length > 1 ||
                                favres.name.length > 5)
                                ? `${favres.name.split(" ")[0]} ${
                                    favres.name.split(" ")[1]
                                      ? favres.name.split(" ")[1].slice(0, 5)
                                      : ""
                                  }...`
                                : favres.name}
                            </CardTitle>
                          </CardHeader>
                        </div>
                        <div className="flex items-center">
                          <Heart
                            className={`h-6 w-6 cursor-pointer transition-transform duration-300 hover:scale-125 transform ${
                              isFavorite
                                ? "text-red-500 fill-current"
                                : "text-black"
                            }`}
                            onClick={() => handleFavRes(favres._id)}
                          />
                        </div>
                      </div>
                      <Link to={"/menu/" + favres?.id}>
                        <CardContent>
                          <div className="flex-shrink-0 h-48">
                            <img
                              className="object-cover w-full h-full"
                              src={
                                import.meta.env.VITE_APP_CLOUDINARY_IMAGE_URL +
                                favres?.imageId
                              }
                              alt="res-logo"
                            />
                          </div>
                          <p className="text-base font-medium whitespace-nowrap overflow-hidden overflow-ellipsis my-1">
                            {favres?.cuisines.join(", ")}
                          </p>
                          <p className="my-1 text-base font-medium">
                            {favres?.costForTwo}
                          </p>
                          <div className="flex justify-between">
                            <span className="font-medium">
                              Total Rating: {favres?.totalRatings}
                            </span>
                            <span className="font-medium flex items-center gap-2">
                              <span>{favres?.avgRating}</span>
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
                              {favres?.slaString}
                            </span>
                            <span>
                              <Timer />
                            </span>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-12 flex justify-center items-center flex-col space-y-6">
                  <p className="text-xl font-medium text-center">
                    No Restaurants In your Favourites
                  </p>

                  <Button
                    className="bg-green-700 hover:bg-green-900 w-[30%]"
                    onClick={() => navigate("/restaurants")}
                  >
                    Browse Restaurants
                  </Button>
                </div>
              )
            ) : favs.dishId.length > 0 ? (
              favs.dishId.map((dish) => {
                const isFav = favDishes.includes(dish?._id);
                return (
                  <Card
                    className="col-span-3 border border-black shadow-lg shadow-gray-600 w-[80%]"
                    key={dish._id}
                  >
                    <div className="flex justify-between items-center px-2">
                      <div className="flex-grow-1">
                        <CardHeader className="flex justify-start items-center">
                          <CardTitle className="whitespace-nowrap overflow-hidden overflow-ellipsis py-2">
                            {dish?.name &&
                            (dish.name.split(" ").length > 1 ||
                              dish.name.length > 5)
                              ? `${dish.name.split(" ")[0]} ${
                                  dish.name.split(" ")[1]
                                    ? dish.name.split(" ")[1].slice(0, 5)
                                    : ""
                                }...`
                              : dish.name}
                          </CardTitle>
                        </CardHeader>
                      </div>
                      <div className="flex items-center">
                        <Heart
                          className={`h-6 w-6 cursor-pointer transition-transform duration-300 hover:scale-125 transform ${
                            isFav ? "text-red-500 fill-current" : "text-black"
                          }`}
                          onClick={() => handlefavDish(dish._id)}
                        />
                      </div>
                    </div>
                    <CardContent>
                      <div className="flex-shrink-0 h-48">
                        <img
                          className="object-cover w-full h-full"
                          src={
                            import.meta.env.VITE_APP_CLOUDINARY_IMAGE_URL +
                            dish?.image
                          }
                          alt="res-logo"
                        />
                      </div>
                      <p className="font-medium">
                        {dish?.description.slice(0, 33)}....
                      </p>
                      <p className="font-medium text-lg">₹ {dish?.mrp / 100}</p>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-12 flex justify-center items-center flex-col space-y-6">
                <p className="text-xl font-medium text-center">
                  No Dishes In your Favourites
                </p>

                <Button
                  className="bg-green-700 hover:bg-green-900 w-[30%]"
                  onClick={() => navigate("/restaurants")}
                >
                  Browse Restaurants
                </Button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default FavouritesPage;
