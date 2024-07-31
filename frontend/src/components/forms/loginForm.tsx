import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { UserCredentials } from "../../interfaces/userCredentials";
import { checkAuth } from "../../functions/Authentication/checkAuth";
import useToast from "../../hooks/useToast";
import Toast from "../popups/Toast";

const LoginForm: React.FC = () => {
  const { isOpen, showToast, text, textType, setIsOpen } = useToast();
  const navigate = useNavigate();
  const USERID = useRef<HTMLInputElement>(null);
  async function handleSubmmiton(event: React.FormEvent) {
    if (USERID.current?.value !== undefined) {
      if (  //input validation
        /^\d+$/.test(USERID.current.value) && 
        (USERID.current.value.length === 7)
      ) {
        event.preventDefault();
        const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3001",
          },
          body: JSON.stringify({ pernr: USERID.current?.value }),
          mode: "cors",
        });
        if (response.status === 401) {
        } else {
          const userProfile: UserCredentials = await response.json();
          localStorage.setItem("userProfile", JSON.stringify(userProfile));
          if (await checkAuth()) {
            navigate("/DashBoardPage/" + userProfile.pernr);
          } else {
            showToast("Error 401: you Id is not authoraized","error");
          }
        }
      }else {
        showToast("Input Error: your ID must be in valid form","warning");
      }
    }else{
      showToast("Input Error: your ID cannot be undefined","error");
    }
  }
  return (
    <form className="LoginForm">
      <p> כניסה למערכת</p>
      <Input
        type="text"
        name="userId"
        inputRef={USERID}
        placeholder="מספר אישי"
        required
      />
      <Button
        type="submit"
        onClick={handleSubmmiton}
        variant="outlined"
        aria-label="fingerprint"
        color="success"
      >
        התחברות
      </Button>
      <Toast message={text} type={textType} isOpen={isOpen} setIsOpen={setIsOpen}/>
    </form>
  );
};
export default LoginForm;
