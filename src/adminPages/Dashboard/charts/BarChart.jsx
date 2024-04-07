/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import Loader from "@/loader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { useQuery } from "@tanstack/react-query";
import { getUserChartData } from "../DashBoardAPI";
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
const BarChart = () => {
  const { data: UsersData, isPending } = useQuery({
    queryKey: ["UsersData"],
    queryFn: getUserChartData,
  });

  const counts = UsersData ? UsersData.map((item) => item.count) : [];
  const data = {
    labels: months,
    datasets: [
      {
        data: counts,
        label: "Users",
        fill: false,
        backgroundColor: "#15803D",
        borderColor: "#15803D",
      },
    ],
  };
  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <Bar
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

export default BarChart;
