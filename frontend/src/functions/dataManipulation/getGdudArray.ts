import { DataForUser } from "../../interfaces/DataForUser";

export default function getGdudArray(dataObj: DataForUser[]) {
  //יצירת המערך שמעבד את המידע ומחזיר את הגדודים הרלוונטים לרמת הגישה למשתמש
  let gdudObjArr : {option:string}[] = [];
  let gdudArr: string[] = dataObj.reduce((acc: any, obj) => {
    if (!acc.includes(obj.gdud)) {
      acc.push(obj.gdud);
    }
    return acc;
  }, []);
  for(let i = 0 ; i<gdudArr.length ; i++){
    gdudObjArr.push({option:gdudArr[i]})
  }
  return gdudObjArr;
}
