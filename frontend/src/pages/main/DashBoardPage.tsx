import Box from "@mui/material/Box";
import AppBarTop from "../../components/Bars/AppBarTop";
import { DataForUser } from "../../interfaces/DataForUser";
import { UserCredentials } from "../../interfaces/userCredentials";
import { redirect } from "react-router-dom";
import { fillKshirutPerMakat } from "../../functions/dataManipulation/fillKshirutPerMakat";
import {
  getPercentageOfKshirutMakat,
  getPercentageOfKshirutAll,
} from "../../functions/dataManipulation/getPercentageOfKshirut";
import { getIsManeger } from "../../functions/Authentication/getIsManeger";
import { DataPerMakat } from "../../interfaces/DataPerMakat";
import BarChartComponent from "../../components/charts/BarChartComponent";
import TotalKshirotComponent from "../../components/charts/TotalKshirotComponent";
import FillterByMakatComponent from "../../components/forms/FillterByMakatComponent";
import { checkAuth } from "../../functions/Authentication/checkAuth";
import { useContext } from "react";
import { WhoIsCtx } from "../../store/WhoIsCtx";
import ThemeObj from "../../interfaces/ThemeObj";
import setTheme from "../../functions/style/setTheme";
import { ThemeContext } from "../../store/ThemeModeCtx";

let DataForUserArr: DataForUser[] = [];
let whoIs: string;
let KshirotPerMakat: DataPerMakat[] = [];

const DashBoardPage: React.FC = () => {
  const WhoIsContext = useContext(WhoIsCtx);
  const { mode, setMode } = useContext(ThemeContext);
  WhoIsContext.WhoIs = whoIs;
  function getArrayOfMakat(KshirotPerMakat: DataPerMakat[]) {
    //פונקציה ליצירת מערך של מק"טים
    let arr: string[] = [];
    for (let i = 0; i < KshirotPerMakat.length; i++) {
      arr.push(KshirotPerMakat[i].makat);
    }
    return arr;
  }

  let value: { numeric: number; Percentage: number } =
    getPercentageOfKshirutAll(DataForUserArr);
  let data = getPercentageOfKshirutMakat(KshirotPerMakat);
  const dataKashir: number[] = data.dataKashir;
  const dataLoKashir: number[] = data.dataLoKashir;
  const makatArray: string[] = getArrayOfMakat(KshirotPerMakat);
  let Theme: ThemeObj; //קוע קוד הזה בורר איזה מצב התאורה ומחיל עליו שינויים
  if (mode === "light") {
    Theme = setTheme("light");
  } else {
    Theme = setTheme("dark");
  }
  return (
    <Box sx={{ backgroundColor: Theme.backGroundColor, height: "100vh" }}>
      <AppBarTop whoIs={WhoIsContext.WhoIs} />
      <Box
        flexDirection="row-reverse"
        display="flex"
        justifyContent="center"
        height="90vh"
        width="100vw"
        margin="0"
        alignItems="center"
      >
        <div className="GridConteinerDashBoard">
          <BarChartComponent
            dataKashir={dataKashir}
            dataLoKashir={dataLoKashir}
            makatArray={makatArray}
          />
          <TotalKshirotComponent
            Percentage={value.Percentage}
            numeric={value.numeric}
          />
          <FillterByMakatComponent KshirotPerMakat={KshirotPerMakat} />
        </div>
      </Box>
    </Box>
  );
};

export async function loader() {
  if (await checkAuth()) {
    let userProfile: UserCredentials | any =
      localStorage.getItem("userProfile"); //מקבלים מזיכרון מקומי מידע על המשתמש
    if (typeof userProfile === "string") {
      //במקרה ויש מידע על המשתמש נעשה בקשה לבק ולקבלת המידע התואם את רמת הגישה למשתמש
      userProfile = JSON.parse(userProfile);
      const response = await fetch("http://localhost:3001/GetDataForUser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },
        body: JSON.stringify(userProfile),
        mode: "cors",
      });
      if (!response.ok) {
        alert("somthing goes wrong with data fetching");
      } else {
        DataForUserArr = await response.json(); //השמת המידע המקובל בשביל המשתמש
        KshirotPerMakat = fillKshirutPerMakat(DataForUserArr); //סינון לתוך מערך בעל פורמט של קשירות של מספר כליי רכב בכל מקט
      }
    } else {
      console.log("User credentials was Expired or Wrong type");
      redirect("/");
    }
    if ((await getIsManeger()) === true) {
      whoIs = "מנהל מערכת"; //אם מנהל מערכת
    } else {
      whoIs = `${userProfile.gdud}  גדוד`; //אם הוא לא
    }
    return null;
  } else {
    return redirect("/");
  }
}

export default DashBoardPage;
