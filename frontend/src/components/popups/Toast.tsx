import { Alert, Snackbar } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";


const Toast: React.FC<{
  message: string;
  type: any;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ message, type, isOpen, setIsOpen }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={isOpen}
      autoHideDuration={3500}
      onClose={() => setIsOpen(false)}
    >
      <Alert
        onClose={() => setIsOpen(false)}
        severity={type !== "" ? type : undefined}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};


export default Toast;