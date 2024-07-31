import * as React from "react";
import Box from "@mui/material/Box";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useContext } from "react";
import { ThemeContext } from "../../store/ThemeModeCtx";
import ThemeObj from "../../interfaces/ThemeObj";
import setTheme from "../../functions/style/setTheme";

const TotalKshirotComponent: React.FC<{
  numeric: number;
  Percentage: number;
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
        borderRadius: "20px",
        display: "grid",
        backgroundColor: Theme.componentColor,
        color: Theme.fontColor,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        <p style={{ margin: "0" }}>כשירות כללית</p>
      </Box>
      <div className="GridConteinerGauge">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Gauge
            aria-valuetext="%"
            value={Number(props.Percentage.toFixed(0))}
            innerRadius={"75%"}
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: colorArr[0],
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: colorArr[1],
              },
              [`& .${gaugeClasses.valueText} text`]: {
                fill: Theme.fontColor,
              },
              width: "90%",
              height: "90%",
            })}
          />
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            gap: "20%",
          }}
        >
          <p
            style={{
              fontSize: "1.6vw",
              margin: 0,
              textAlign: "end",
              marginRight: "20px",
            }}
          >
            כשירות באחוזים : {props.Percentage.toFixed(2) + "%"}
          </p>
          <p
            style={{
              fontSize: "1.6vw",
              margin: 0,
              textAlign: "end",
              marginRight: "20px",
            }}
          >
            כשירות מספרית : {props.numeric}
          </p>
        </Box>
      </div>
    </Box>
  );
};

export default TotalKshirotComponent;
