import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface ThemeContext {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
};
type ThemeProviderProps = {
    children : ReactNode
}

const defaultState = {
    mode : "light",
    setMode: (mode : string) => {}
} as ThemeContext



export const ThemeContext = createContext(defaultState);

export default function ThemeProvider({children}: ThemeProviderProps){
    const [mode , setMode] = useState<string>("light");
    return(
        <div>
            <ThemeContext.Provider value={{mode , setMode}}>
            {children}
            </ThemeContext.Provider>
        </div>
    )

}