import { useState } from "react";

const useToast = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [textType, setTextType] = useState("");

  const showToast = (message: string, type: string) => {
    setIsOpen(true);
    setText(message);
    setTextType(type);
    console.log(message,type)
  };

  return {
    showToast,
    isOpen,
    setIsOpen,
    text,
    setText,
    textType,
    setTextType,
  };
};

export default useToast;
