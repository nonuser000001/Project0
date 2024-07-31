import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { redirect, useNavigate } from "react-router";
import MenuButton from "../Bars/MenuButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { ThemeContext } from "../../store/ThemeModeCtx";
import setTheme from "../../functions/style/setTheme";
import ThemeObj from "../../interfaces/ThemeObj";


const AppBarTop: React.FC<{ whoIs: string }> = (props) => {
  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }
  function handleDarkMode() {
    if (mode === "light") {
      setMode((prevMode) => (prevMode = "dark"));
    } else {
      setMode((prevMode) => (prevMode = "light"));
  
    }
  }
  let Theme: ThemeObj;
  const { mode, setMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  if (mode === "light") {
    Theme = setTheme("light");
  } else {
    Theme = setTheme("dark");
  }
  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: Theme.componentColor,
          marginBottom: 1,
          boxShadow: Theme.boxShadow,
          borderRadius: "20px",
        }}
      >
        <Toolbar>
          <MenuButton />
          <IconButton onClick={handleDarkMode} sx={{ marginRight: "30px" , color: Theme.fontColor }}>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Logo_himush_from_2015.png/199px-Logo_himush_from_2015.png"
            width="45px"
            height="58px"
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: Theme.fontColor,
              alignItems: "start",
              textAlignLast: "right",
              alignSelf: "center",
              marginRight: "20px",
            }}
          >
            {props.whoIs}
          </Typography>
          <Button
            onClick={handleLogout}
            sx={{
              color: Theme.fontColor,
              borderRadius: 20,
              borderStyle: "groove",
              border: 1,
            }}
          >
            התנתקות
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppBarTop;
