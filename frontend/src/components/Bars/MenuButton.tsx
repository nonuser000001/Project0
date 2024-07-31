import ListItemDecorator from "@mui/joy/ListItemDecorator";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import MenuButton from "@mui/joy/MenuButton";
import Apps from "@mui/icons-material/Apps";
import Dropdown from "@mui/joy/Dropdown";
import AddIcon from "@mui/icons-material/Add";
//import EditIcon from "@mui/icons-material/Edit";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import { redirect, useNavigate } from "react-router";
import { UserCredentials } from "../../interfaces/userCredentials";
import { WhoIsCtx } from "../../store/WhoIsCtx";
import { useContext } from "react";
import setTheme from "../../functions/style/setTheme";
import ThemeObj from "../../interfaces/ThemeObj";
import { ThemeContext } from "../../store/ThemeModeCtx";


export default function AppsMenu() {
  const { mode, setMode } = useContext(ThemeContext);
  const WhoIsContext = useContext(WhoIsCtx);
  const navigate = useNavigate();
  let isManeger: boolean;
  let userProfile: UserCredentials | any = localStorage.getItem("userProfile");
  let menuSizeForUserType:string;
  let Theme: ThemeObj;
  if (mode === "light") {
    Theme = setTheme("light");
  } else {
    Theme = setTheme("dark");
  }
  if (WhoIsContext.WhoIs === "מנהל מערכת") {
    isManeger = true;
  } else isManeger = false;
  if (isManeger === true) menuSizeForUserType="repeat(3, 100px)"
  else menuSizeForUserType="repeat(2, 100px)"
  userProfile = JSON.parse(userProfile);
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain" } }}
        sx={{".MuiSvgIcon-root":{color: Theme.fontColor}, borderRadius: 40, marginRight: 1 }}
      >
        <Apps />
      </MenuButton>
      <Menu
        variant="solid"
        invertedColors
        aria-labelledby="apps-menu-demo"
        sx={{
          "--List-padding": "0.5rem",
          "--ListItemDecorator-size": "3rem",
          display: "grid",
          gridTemplateColumns: menuSizeForUserType,
          gridAutoRows: "100px",
          gap: 1,
          backgroundColor: "rgb(0 0 0 / 50%);",
          border: "black",
          borderRadius: "2px",
        }}
      >
        {isManeger ? (
          <MenuItem
            onClick={() => {
              redirect("/Add/" + userProfile.pernr);
              navigate("/Add/" + userProfile.pernr);
            }}
            orientation="vertical"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: "0.7rem",
            }}
          >
            <ListItemDecorator>
              <AddIcon />
            </ListItemDecorator>
            הוספת צ
          </MenuItem>
        ) : null}

        <MenuItem
          onClick={() => {
            redirect("/DashBoardPage/" + userProfile.pernr);
            navigate("/DashBoardPage/" + userProfile.pernr);
          }}
          orientation="vertical"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: "0.7rem",
          }}
        >
          <ListItemDecorator>
            <DashboardIcon />
          </ListItemDecorator>
          מסך הבית
        </MenuItem>
        <MenuItem
          onClick={() => {
            redirect("/info");
            navigate("/info");
          }}
          orientation="vertical"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: "0.7rem",
          }}
        >
          <ListItemDecorator>
            <InfoIcon />
          </ListItemDecorator>
          אודות המערכת
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
