import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import CongratsIcon from "@/assets/Congratulation.webp";
import { Button } from "./ui/button";

const CongratsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen ">
      <NavBar />
      <div className="flex flex-col justify-center items-center py-5">
        <h1 className="text-2xl font-medium mb-4">Order Placed Successfully</h1>
        <div className="w-[20%] h-[20%]  flex items-center justify-center mb-4">
          <img src={CongratsIcon} alt="Congrats Icon" />
        </div>
        <div>
          <Button
            className="bg-green-700 hover:bg-green-800 px-5"
            onClick={() => {
              navigate("/restaurants");
            }}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CongratsPage;
