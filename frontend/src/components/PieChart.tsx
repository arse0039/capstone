import { Chart } from "react-google-charts";

export const options = {
  chartArea: { left: 0, top: 0, bottom:20, width: "100%", height: "100%" },
  height: 420,
  width: 620,
  legend: {
    alignment: "center",
  },
  colors: ["#71697A", "#B3D7C0", "#5BB8C0", "#FAA916", "#2A57B0", "#6B4E71", "#FAB2EA", "#305252", "#1D3354", "#F6354F"],
};

interface PieChartProps {
  data: Record<string, number>;
}

export function PieChart({ data }: PieChartProps) {
    console.log("Rendering PieChart with options:", options);

  const chartData = [
    ["Genres", "Percentage"],
    ...Object.entries(data).map(([genre, percentage]) => [genre, percentage]),
  ];

  return (
      <Chart chartType="PieChart" data={chartData} options={options} />

  );
}
