import { useQuery } from "@tanstack/react-query";
import { getAllRestaurants } from "./RestaurantsAPI";
import ResCardSkeleton from "./ResCardSkeleton";

// eslint-disable-next-line react/prop-types
const ResCard = ({ resId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["Restaurant", resId],
    queryFn: ({ queryKey }) => getAllRestaurants({ resId: queryKey[1] }),
  });

  return (
    <>
      {isLoading ? (
        <ResCardSkeleton />
      ) : (
        <div className="border-[0.8px] border-gray-600 bg-slate-300 flex justify-between shadow-2xl py-2 rounded-lg w-full px-3">
          <div className="justify-start w-1/2 px-2 space-y-2 ">
            <p className="font-medium  text-lg">{data?.restaurants[0]?.name}</p>
            <p className="text-base font-medium text-gray-600 text-wrap md:text-nowrap overflow-hidden overflow-ellipsis my-1 ">
              {data?.restaurants[0]?.cuisines?.join(", ")}
            </p>
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {data?.restaurants[0]?.avgRating}
              </span>
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  role="img"
                  aria-hidden="true"
                >
                  <circle cx="10" cy="10" r="9" fill="url(#gradient)"></circle>
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
                      <stop offset="1" stopColor="#128540"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </div>
            <p className="font-medium">{data?.restaurants[0]?.costForTwo}</p>
          </div>
          <div className="h-32 w-32 ">
            <img
              className="object-cover h-full w-full"
              src={
                import.meta.env.VITE_APP_CLOUDINARY_IMAGE_URL +
                data?.restaurants[0]?.imageId
              }
              alt="res-logo"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ResCard;
