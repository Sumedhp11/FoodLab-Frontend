import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
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
    navigate("/");
  };
  const formattedTime = time.toLocaleTimeString();
  return (
    <div className="flex items-center border rounded px-2 py-2 justify-between">
      <div className="flex items-center gap-3">
        <div className="w-24">
          <img
            className="w-full rounded-full"
            src="https://static.vecteezy.com/system/resources/previews/021/620/229/original/cute-burger-cartoon-icon-illustration-delicious-cheeseburger-food-icon-concept-illustration-suitable-for-icon-logo-sticker-clipart-free-vector.jpg"
            alt=""
          />
        </div>
        <div>
          <h1 className="text-xl font-medium text-white">Welcome Foodie!</h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <h2 className="text-white font-medium">{formattedTime}</h2>
        {isloggedIn === "true" ? (
          <Button
            onClick={handleSignout}
            className="bg-white text-black hover:bg-slate-300"
          >
            Sign out
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
