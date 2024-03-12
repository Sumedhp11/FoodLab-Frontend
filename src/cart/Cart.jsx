import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewAddress, addtoCart, checkout, fetchCartById } from "./cartAPI";
import Loader from "@/loader";
import vegIcon from "@/assets/veg-icon.png";
import nonvegIcon from "@/assets/non-veg icon.png";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Cart = () => {
  const queryClient = useQueryClient();
  const userId = localStorage.getItem("UserId");
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setselectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    flatno: "",
    landmark: "",
    streetName: "",
    city: "",
    state: "",
    pincode: "",
  });

  const {
    data: cart,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCartById({ userId: userId }),
  });

  useEffect(() => {
    setCartItems(cart?.data?.cartItems);
  }, [isSuccess, setCartItems, cart?.data?.cartItems]);

  const { mutate, isPending } = useMutation({
    mutationFn: addtoCart,
    onSuccess: () => {
      queryClient.invalidateQueries("cart");
    },
  });

  const handleDecrement = (dishId) => {
    const updatedCartItems = cartItems.map((item) =>
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

  const handleIncrement = (dishId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.dish._id === dishId ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCartItems(updatedCartItems);

    const updatedCartItem = updatedCartItems.find(
      (item) => item.dish._id === dishId
    );

    if (updatedCartItem) {
      mutate({ userId, quantity: updatedCartItem.quantity, dishId });
    }
  };

  const { mutate: makePayment } = useMutation({
    mutationFn: checkout,
    onSuccess: (data) => {
      const options = {
        key: `${import.meta.env.VITE_APP_RAZORPAY_KEY}`,
        amount: cart?.data?.totalPrice,
        currency: "INR",
        name: cart?.data?.user?.name,
        image:
          "https://static.vecteezy.com/system/resources/previews/021/620/229/original/cute-burger-cartoon-icon-illustration-delicious-cheeseburger-food-icon-concept-illustration-suitable-for-icon-logo-sticker-clipart-free-vector.jpg",
        order_id: data.data.id,
        callback_url: `${import.meta.env.VITE_APP_URL_API}/paymentverification`,
        prefill: {
          name: cart?.data?.user?.name,
          email: cart?.data?.user?.email,
          contact: cart?.data?.user?.phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#15803D",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    },
  });

  const handleCheckout = () => {
    makePayment({
      amount: cart?.data?.totalPrice,
      userId: userId,
      selectedAddress: selectedAddress,
      cartItems: cartItems,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { mutate: addnewAddressFn } = useMutation({
    mutationKey: ["address"],
    mutationFn: addNewAddress,
    onSuccess: () => {
      queryClient.invalidateQueries("cart");
      setNewAddress({
        flatno: "",
        landmark: "",
        streetName: "",
        city: "",
        state: "",
        pincode: "",
      });
    },
  });
  const handleSelectAddress = (e) => {
    setselectedAddress(e);
  };

  const handleAddnewAddress = () => {
    const addressDataWithUserId = {
      userId: userId,
      ...newAddress,
    };
    addnewAddressFn({ addressData: addressDataWithUserId });
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <section className="py-4 flex justify-center space-x-10">
        <div className="flex flex-col w-[60%] space-y-4 py-5 shadow-2xl rounded-lg h-fit">
          <div className="px-3">
            <h1 className="px-3 text-lg font-semibold">Checkout Form</h1>
          </div>
          {cart?.data?.user?.addresses.length >= 1 ? (
            <div className="flex gap-4 w-full border px-3 py-2">
              <div className="px-3">
                <h2 className="text-lg font-semibold">Select Address:</h2>
                <div className="py-4 border space-y-8">
                  <RadioGroup
                    className="space-y-7"
                    onValueChange={handleSelectAddress}
                  >
                    {cart?.data?.user?.addresses.map((address) => (
                      <div
                        className="flex items-center space-x-2 "
                        key={address.id}
                      >
                        <RadioGroupItem id={address.id} value={address.id} />
                        <Label htmlFor={address.id} className="text-base">
                          {`${address.flatno}, ${address.streetName}, ${address.landmark}, ${address.city}, ${address.state}, ${address.pincode}`}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          ) : null}
          <>
            <div className="px-3">
              <h1 className="px-3 text-lg font-semibold">Add New Address:</h1>
            </div>
            <div className="flex gap-4 w-full border px-3">
              <div className="w-1/2 px-3">
                <Label className="text-nowrap font-medium text-base">
                  Flat or Apartment No:
                </Label>
                <Input
                  name="flatno"
                  value={newAddress.flatno}
                  className="text-lg border border-gray-800 w-full"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/2 px-3">
                <Label className="text-nowrap font-medium text-base">
                  LandMark:
                </Label>
                <Input
                  value={newAddress.landmark}
                  name="landmark"
                  className="text-lg border border-gray-800 w-full"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex gap-4 w-full border px-3">
              <div className="w-1/2 px-3">
                <Label className="text-nowrap font-medium text-base">
                  Street Name:
                </Label>
                <Input
                  value={newAddress.streetName}
                  name="streetName"
                  className="text-lg border border-gray-800 w-full"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/2 px-3">
                <Label className="text-nowrap font-medium text-base">
                  City:
                </Label>
                <Input
                  value={newAddress.city}
                  name="city"
                  className="text-lg border border-gray-800 w-full"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex gap-4 w-full border px-3">
              <div className="w-1/2 px-3">
                <Label className="text-nowrap font-medium text-base">
                  State:
                </Label>
                <Input
                  value={newAddress.state}
                  name="state"
                  className="text-lg border border-gray-800 w-full"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/2 px-3">
                <Label className="text-nowrap font-medium text-base">
                  Pincode:
                </Label>
                <Input
                  value={newAddress.pincode}
                  name="pincode"
                  className="text-lg border border-gray-800 w-full"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </>

          <div className="flex gap-4 w-full border px-3">
            <div className="w-1/2 px-3">
              <Button
                className="bg-green-700 hover:bg-green-900"
                onClick={handleAddnewAddress}
              >
                Add Address
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-col px-3 py-3  w-[20%] space-y-5 h-fit rounded-md shadow-2xl">
          {isLoading ? (
            <Loader />
          ) : (
            cartItems?.map((item) => (
              <div
                key={item.dish._id}
                className="border-[0.8px] border-gray-600 flex justify-between shadow-2xl py-2 rounded-lg w-full px-3 "
              >
                <div className="justify-start w-1/2 px-2 space-y-2">
                  <p className="font-medium text-lg">{item.dish.name}</p>

                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {item.dish.isVeg ? "Veg" : "Non-Veg"}
                    </span>
                    <span className="w-6 h-6 rounded-full">
                      <img
                        src={item.dish.isVeg ? vegIcon : nonvegIcon}
                        alt=""
                      />
                    </span>
                  </div>
                  <p className="font-medium">₹ {item.dish.mrp / 100} </p>
                </div>
                <div className="h-32 w-32 relative">
                  <img
                    className="object-cover h-full w-full"
                    src={import.meta.env.VITE_APP_IMAGE_URL + item.dish.image}
                    alt="res-logo"
                  />
                  <div className="absolute bottom-0 bg-green-700 w-full flex justify-between font-normal rounded-md cursor-pointer text-white">
                    <button onClick={() => handleDecrement(item.dish._id)}>
                      <Minus />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => handleIncrement(item.dish._id)}>
                      <Plus />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="border-[0.8px] border-gray-600 flex justify-between shadow-2xl py-2 rounded-lg w-full px-3 ">
            <h4>Total : </h4>
            <h4>₹ {cart?.data?.totalPrice}</h4>
          </div>
          <div className="  shadow-2xl py-2 rounded-lg w-full  ">
            <Button
              className="bg-green-700 w-full hover:bg-green-800"
              onClick={handleCheckout}
            >
              {isPending ? (
                <span>
                  <Loader />
                </span>
              ) : (
                <span>Checkout and Pay</span>
              )}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
