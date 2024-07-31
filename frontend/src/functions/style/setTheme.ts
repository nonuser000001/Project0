import ThemeObj from "../../interfaces/ThemeObj";

export default function setTheme(theme:string){//פונקציה שקובעת את צבעי העיצוב למערך בהתאם תאורת המשתמש
    let Theme: ThemeObj={ componentColor:"",backGroundColor:"ffffff" , fontColor:"000000" , boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
    if (theme=== "light"){
        Theme.fontColor="black";
        Theme.backGroundColor="#F0EBE3";//DBDFAA
        Theme.boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px";
        Theme.componentColor="#F6F5F2"//F5F0BB
      }
    else if(theme === "dark") {
        Theme.fontColor="#f6f7f8"
        Theme.backGroundColor="#282828";
        Theme.boxShadow="rgba(58, 67, 75, 0.35) 0px 5px 15px";
        Theme.componentColor="#3f3f3f"
      }
      return Theme;
}