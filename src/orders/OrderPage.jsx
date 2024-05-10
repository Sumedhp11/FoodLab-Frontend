import NavBar from "@/components/NavBar";
import { useQuery } from "@tanstack/react-query";
import { getOrdersByUserId } from "./orderAPI";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const userId = localStorage.getItem("UserId");

  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrdersByUserId({ userId: userId }),
  });

  return (
    <div className="min-h-screen">
      <NavBar />
      <section className="w-full h-full flex justify-center py-5">
        <div className="flex-col w-[80%] md:w-[60%] space-y-3">
          <h1 className="text-2xl font-medium text-center">Your Orders</h1>
          {data?.length >= 1 ? (
            data?.map((order) => (
              <div
                key={order?.id}
                className="bg-slate-300 flex justify-between shadow-2xl py-10 rounded-lg w-full  px-5 space-y-4"
              >
                <div className=" w-full px-2 space-y-5 gap-3 ">
                  {order?.dishes?.map((dish) => (
                    <div
                      key={dish?._id}
                      className="bg-white flex justify-between shadow-2xl py-2 rounded-lg w-full px-3 "
                    >
                      <div className="flex-col w-1/2 space-y-4">
                        <p className="font-medium md:text-lg text-base">
                          {dish?.dish?.name}
                        </p>
                        <p className="font-medium text-base">
                          Price: ₹{dish?.dish?.mrp / 100}{" "}
                        </p>
                        <p className="font-medium text-base">
                          Quantity: {dish?.quantity}
                        </p>
                      </div>
                      <div className="flex-col  w-1/2 ">
                        <div className="md:h-32 md:w-32 h-32 w-fit ml-auto">
                          <img
                            className="object-cover h-full w-full"
                            src={
                              import.meta.env.VITE_APP_CLOUDINARY_IMAGE_URL +
                              dish?.dish?.image
                            }
                            alt="res-logo"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="bg-white  shadow-2xl py-2 rounded-lg w-full px-3  ">
                    <div className="w-full flex justify-between my-2">
                      <p className=" font-medium text-sm md:text-base text-wrap  w-1/2">
                        Address:{" "}
                        {`${order?.address.flatno}, ${order?.address.streetName}, ${order?.address.landmark}, ${order?.address.city}, ${order?.address.state}, ${order?.address.pincode}`}
                      </p>
                      <p className="text-right font-medium text-sm md:text-base flex-shrink">
                        Total: ₹{order?.amount / 100}
                      </p>
                    </div>

                    <div className="w-full flex justify-between">
                      <p className="font-medium text-sm md:text-base">
                        Payment Status:{" "}
                        {order?.paymentStatus.charAt(0).toUpperCase() +
                          order?.paymentStatus.slice(1)}
                      </p>
                      <p className="text-right font-medium text-sm md:text-base flex-grow">
                        Delivery Status:{" "}
                        {order?.deliveryStatus.charAt(0).toUpperCase() +
                          order?.deliveryStatus.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col space-y-8 justify-center items-center">
              <h1 className="text-center font-medium ">
                Sorry you dont have any Orders Yet!
              </h1>
              <Link to={"/restaurants"}>
                <Button className="bg-green-700  hover:bg-green-900">
                  Browse Restaurants
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrderPage;
