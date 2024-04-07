import NavBar from "@/components/NavBar";
import AdminSideBar from "../AdminSideBar";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import PieChart from "./charts/PieChart";

const DashBoardPage = () => {
  return (
    <div className="w-full h-[100vh] overflow-hidden">
      <NavBar />
      <div className="flex gap-5">
        <AdminSideBar />
        <div className="w-full">
          <div className="w-full flex mt-3 px-4 gap-5 ">
            <div className="w-[50%] flex flex-col items-center">
              <h4 className="font-medium text-lg">Orders Per Month</h4>
              <LineChart value={[1, 2, 3, 4, 5, 2, 4, 5, 9, 2, 11, 12]} />
            </div>
            <div className="w-[50%] flex flex-col items-center">
              <h4 className="font-medium text-lg">Users Per Month</h4>
              <BarChart value={[1, 2, 3, 4, 5, 2, 4, 5, 9, 2, 11, 12]} />
            </div>
          </div>
          <div className="h-[30%] px-4 flex flex-col  justify-center items-center mt-8">
            <h4 className="font-medium text-lg">Orders Status</h4>
            <PieChart
              labels={["Placed", "Delivered", "Cancelled"]}
              value={[3, 8, 2, 11]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
