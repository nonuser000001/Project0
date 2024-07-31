import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TableMakat from "../charts/TableMakat";
import { useRef, useState } from "react";
import { DataPerMakat } from "../../interfaces/DataPerMakat";
import ThemeObj from "../../interfaces/ThemeObj";
import setTheme from "../../functions/style/setTheme";
import { ThemeContext } from "../../store/ThemeModeCtx";
import useToast from "../../hooks/useToast";
import Toast from "../popups/Toast";
import { checkAuth } from "../../functions/Authentication/checkAuth";

function useForceUpdate() {
  // custom hook to force re-render Every time Makat was searched by the user
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

const FillterByMakatComponent: React.FC<{ KshirotPerMakat: DataPerMakat[] }> = (
  props
) => {
  const { isOpen, showToast, text, textType, setIsOpen } = useToast();
  const forceUpdate = useForceUpdate();
  const Makat = useRef<HTMLInputElement>(null);
  const [Submited, setSubmited] = useState<boolean>(false);
  const { mode, setMode } = React.useContext(ThemeContext);
  async function handleSubmmiton(event: React.FormEvent) {
    event.preventDefault();
    if(await checkAuth() === true){
      if (Makat.current?.value !== undefined) {
        if (
          /^\d+$/.test(Makat.current.value) && //input validation 
          Makat.current.value.length === 6
        ) {
          setSubmited(true);
          forceUpdate();
        }else {
          showToast("Input Error :Makat should be valid form , please Enter valid Makat","warning")
        }
      }else {
        showToast("Input Error : data cannot be undefined","error");
      }
    }else{
      showToast(" Access Error : your access was restricted please disconect and login again , or try contact system adminestration","error");
    }
  }
  let Theme: ThemeObj;
  if (mode === "light") {
    Theme = setTheme("light");
  } else {
    Theme = setTheme("dark");
  }
  return (
    <Box
      sx={{
        boxShadow: Theme.boxShadow,
        borderRadius: "20px",
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr 4fr",
        background: Theme.componentColor,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "65%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form className="searchForm">
          <Input
            inputRef={Makat}
            placeholder='חיפוש מק"ט'
            sx={{
              height: "90%",
              width: "90%",
              marginLeft: "10px",
              marginRight: "10px",
              color: Theme.fontColor,
            }}
            disableUnderline={true}
          />
          <IconButton
            sx={{ ".MuiSvgIcon-root": { color: Theme.fontColor } }}
            onClick={handleSubmmiton}
            type="submit"
          >
            <SearchIcon />
          </IconButton>
        </form>
      </Box>
      <Box>
        {Submited ? (
          <TableMakat
            Makat={Makat.current?.value}
            KshirotPerMakat={props.KshirotPerMakat}
          />
        ) : undefined}
        <Toast message={text} type={textType} isOpen={isOpen} setIsOpen={setIsOpen}/>
      </Box>
    </Box>
  );
};

export default FillterByMakatComponent;
