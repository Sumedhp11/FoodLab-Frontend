import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlignJustify,
  Heart,
  LogOut,
  ShoppingBasket,
  Store,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { useQuery } from "@tanstack/react-query";
import { fetchCartById } from "@/cart/cartAPI";
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
} from "./ui/alert-dialog";

const NavBar = () => {
  const userId = localStorage.getItem("UserId");
  const isAdmin = localStorage.getItem("isAdmin");
  const Name = localStorage.getItem("Name");
  const navigate = useNavigate();
  const isloggedIn = localStorage.getItem("IsloggenIn");
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const handleSignout = () => {
    localStorage.setItem("IsloggenIn", false);
    localStorage.setItem("UserId", null);
    localStorage.setItem("isAdmin", null);
    localStorage.setItem("Name", null);
    navigate("/");
  };

  const { data } = useQuery({
    queryKey: ["cartcount"],
    queryFn: () => fetchCartById({ userId: userId }),
  });

  const formattedTime = time.toLocaleTimeString();
  return (
    <div className="flex bg-green-700 items-center border rounded px-2 py-2 justify-between">
      <div className="flex items-center gap-3">
        <div className="w-20 md:w-24">
          <Link
            to={
              isloggedIn === "true"
                ? isAdmin === "true"
                  ? "/admin"
                  : "/restaurants"
                : ""
            }
          >
            <img
              className="w-full rounded-full"
              src="https://static.vecteezy.com/system/resources/previews/021/620/229/original/cute-burger-cartoon-icon-illustration-delicious-cheeseburger-food-icon-concept-illustration-suitable-for-icon-logo-sticker-clipart-free-vector.jpg"
              alt=""
            />
          </Link>
        </div>
        <div>
          <h1 className="text-lg md:text-xl font-medium text-white">
            Welcome{" "}
            {isloggedIn === "true"
              ? window.innerWidth < 768
                ? Name.split(" ")[0]
                : Name
              : "Foodie!"}
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <h2 className={`text-white font-medium hidden md:block`}>
          {formattedTime}
        </h2>
        {isloggedIn === "true" && isAdmin === "false" ? (
          <>
            <Link to={"/cart"}>
              <div className="relative py-3">
                <ShoppingBasket size={30} color="white" />
                <Badge className="absolute -top-3 bg-black text-white ">
                  {data?.data?.cartItems?.length}
                </Badge>
              </div>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-fit  flex items-center">
                  <AlignJustify size={25} color="white" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mx-3 bg-green-700">
                <DropdownMenuGroup>
                  <>
                    <Link to={"/favourites"}>
                      <DropdownMenuItem className="flex items-center justify-between cursor-pointer hover:bg-green-700">
                        <span className="font-medium text-base text-white">
                          Favourites
                        </span>
                        <Heart size={25} color="white" />
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link to={"/orders"}>
                      <DropdownMenuItem className="flex items-center justify-between cursor-pointer hover:bg-green-700">
                        <span className="font-medium text-base text-white">
                          Your Orders
                        </span>
                        <Store size={25} color="white" />
                      </DropdownMenuItem>
                    </Link>
                  </>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : null}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            {isloggedIn === "true" && (
              <LogOut size={25} color="white" cursor={"pointer"} />
            )}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you Sure?</AlertDialogTitle>
              <AlertDialogDescription className="font-normal">
                {isAdmin === "false"
                  ? "Thank you For Your Time, Enjoy Your Food!"
                  : "See you Next Time Admin"}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-700"
                onClick={handleSignout}
              >
                SignOut
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default NavBar;
