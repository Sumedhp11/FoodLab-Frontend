/* eslint-disable react/prop-types */
import { Doughnut } from "react-chartjs-2";
import Loader from "@/loader";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getPieChartData } from "../DashBoardAPI";
ChartJS.register(ArcElement, Tooltip, Legend);

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 80,
};
const PieChart = () => {
  const { data: DougnutChartData, isPending } = useQuery({
    queryKey: ["PieChartData"],
    queryFn: getPieChartData,
  });

  if (isPending) return <Loader />;
  const data = {
    labels: Object.keys(DougnutChartData),
    datasets: [
      {
        data: Object.values(DougnutChartData),
        backgroundColor: ["#15803D", "red", "yellow", "orange"],
        hoverBackgroundColor: ["white"],
        borderColor: ["black"],
        offset: 20,
      },
    ],
  };
  return (
    <>
      <Doughnut
        style={{
          zIndex: 10,
        }}
        data={data}
        options={doughnutChartOptions}
      />
    </>
  );
};

export default PieChart;
