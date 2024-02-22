import { Bar } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

const BarChart = ({data, title}) => {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

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
