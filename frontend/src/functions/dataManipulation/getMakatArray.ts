import { DataPerMakat } from "../../interfaces/DataPerMakat";

export default function getMakatArray(dataObj: DataPerMakat[]) {
  //יצירת המערך שמעבד את המידע ומחזיר את הגדודים הרלוונטים לרמת הגישה למשתמש
  let MakatObjArr : {option:string}[] = [];
  let makatArr: string[] = dataObj.reduce((acc: any, obj) => {
    if (!acc.includes(obj.makat)) {
      acc.push(obj.makat);
    }
    return acc;
  }, []);
  for(let i = 0 ; i<makatArr.length ; i++){
    MakatObjArr.push({option:makatArr[i]})
  }
  return MakatObjArr;
}
