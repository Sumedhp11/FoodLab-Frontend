/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import Loader from "@/loader";
import { useQuery } from "@tanstack/react-query";
import {
  Chart as CHARTJS,
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";
import { getOrderChartData } from "../DashBoardAPI";
CHARTJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: true,
      },
    },
  },
};
const LineChart = () => {
  const { data: OrdersData, isPending } = useQuery({
    queryKey: ["OrdersData"],
    queryFn: getOrderChartData,
  });
  const counts = OrdersData ? OrdersData.map((item) => item.totalOrders) : [];
  const data = {
    labels: months,
    datasets: [
      {
        data: counts,
        label: "Orders",
        fill: false,
        backgroundColor: "black",
        borderColor: "#15803D",
      },
    ],
  };
  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <Line
          style={{
            border: "1px solid black",
            borderRadius: "1%",
            padding: "10px",
          }}
          data={data}
          options={lineChartOptions}
        />
      )}
    </>
  );
};

export default LineChart;
