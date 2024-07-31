import * as React from "react";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { useContext } from "react";
import { ThemeContext } from "../../store/ThemeModeCtx";
import setTheme from "../../functions/style/setTheme";
import ThemeObj from "../../interfaces/ThemeObj";

const BarChartComponent: React.FC<{
  dataKashir: number[];
  dataLoKashir: number[];
  makatArray: string[];
}> = (props) => {
  const { mode, setMode } = useContext(ThemeContext);
  let colorArr: string[];
  let Theme: ThemeObj;
  if (mode === "light") {
    colorArr = ["#006B3C", "#47A76A"];
    Theme = setTheme("light");
  } else {
    colorArr = ["#025430", "#3D8658"];
    Theme = setTheme("dark");
  }
  return (
    <Box
      sx={{
        boxShadow: Theme.boxShadow,
        gridRow: "span 2",
        borderRadius: "20px",
        backgroundColor: Theme.componentColor,
        color: Theme.fontColor,
      }}
    >
      <BarChart
        sx={{
          "tspan": {fill: Theme.fontColor+" !important"},
          //change left yAxis label styles
          "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
            fill: Theme.fontColor,
          },
          // change bottom label styles
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
            fill: Theme.fontColor,
          },
          width: "95%",
          height: "95",
        }}
        yAxis={[{ scaleType: "band", data: props.makatArray }]}
        series={[
          { data: props.dataKashir, stack: "A", label: "כשיר" },
          { data: props.dataLoKashir, stack: "A", label: "לא כשיר" },
        ]}
        layout="horizontal"
        colors={colorArr}
      />
    </Box>
  );
};

export default BarChartComponent;
