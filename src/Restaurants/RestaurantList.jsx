import { useState, useEffect, useMemo } from "react";
import NavBar from "@/components/NavBar";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllRestaurants } from "./RestaurantsAPI";
import Loader from "@/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer } from "lucide-react";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";

const RestaurantList = () => {
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

  return (
    <div className="bg-black min-h-screen border-2 border-red-700">
      <NavBar />
      <section className="w-full h-full flex justify-center">
        <div className="w-[80%] px-3 py-16 h-full">
          <div className="flex gap-3 my-3">
            <div>
              <Input
                onChange={handleSearchChange}
                value={searchQuery}
                placeholder="Search Restaurants"
                className="w-72 font-medium"
              />
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {restaurants?.pages.map((page) =>
                page?.restaurants?.map((restaurant) => {
                  return (
                    <div key={restaurant._id}>
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {restaurant?.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col">
                          <div className="flex-shrink-0 h-48">
                            <img
                              className="object-cover w-full h-full"
                              src={
                                import.meta.env.VITE_APP_IMAGE_URL +
                                restaurant?.imageId
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
                            <span className="font-medium">
                              {restaurant?.avgRating} ⭐
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
        {isFetchingNextPage && <Loader />}
      </section>
    </div>
  );
};

export default RestaurantList;
