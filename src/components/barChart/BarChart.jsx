import { Bar } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const BarChart = ({data}) => {
  return (
    <>
      {
        data.labels.length ? (
          <Bar data={data} options={options} />
        )
        : null
      }
    </>
  );
}

export default BarChart;
