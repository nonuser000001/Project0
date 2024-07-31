import { DataForUser } from "../../interfaces/DataForUser";
import { DataPerMakat } from "../../interfaces/DataPerMakat";

export function fillKshirutPerMakat(DataForUserArr: DataForUser[]) {//פוקציה שמחזירה מערך בפורמט של לכל מקט יש מספרי רכב ואת כשירותם
    let KshirotPerMakat: DataPerMakat[] = [];
    for (let i = 0; i < DataForUserArr.length; i++) {
      if (KshirotPerMakat.length === 0) {
        KshirotPerMakat.push({
          makat: DataForUserArr[i].makat,
          kshirotPerNumber: [
            {
              CarNumber: DataForUserArr[i].carNumber,
              kshirot: DataForUserArr[i].kshirot,
            },
          ],
        });
      } else if (
        KshirotPerMakat.find((obj) => obj.makat === DataForUserArr[i].makat) ===
        undefined
      ) {
        KshirotPerMakat.push({
          makat: DataForUserArr[i].makat,
          kshirotPerNumber: [
            {
              CarNumber: DataForUserArr[i].carNumber,
              kshirot: DataForUserArr[i].kshirot,
            },
          ],
        });
      } else {
        const index = KshirotPerMakat.indexOf(
          KshirotPerMakat.find((obj) => obj.makat === DataForUserArr[i].makat)!
        );
        KshirotPerMakat[index].kshirotPerNumber.push({
          CarNumber: DataForUserArr[i].carNumber,
          kshirot: DataForUserArr[i].kshirot,
        });
      }
    }
    return KshirotPerMakat
  }