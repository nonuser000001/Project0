
import { DataForUser } from "../../interfaces/DataForUser";
import { DataPerMakat } from "../../interfaces/DataPerMakat";

export function getPercentageOfKshirutMakat(//פונקציה שמקבלת אחוזי כשירות לכל מקט בנפרד כמו בכל עמודה בטבלה
  KshirotPerMakat: DataPerMakat[]
) {
  let dataBarKashir: number[] = [];
  let dataBarLoKashir: number[] = [];
  let counter: number = 0;
  for (let i = 0; i < KshirotPerMakat.length; i++) {
    for (let j = 0; j < KshirotPerMakat[i].kshirotPerNumber.length; j++) {
      if (KshirotPerMakat[i].kshirotPerNumber[j].kshirot === "1") counter++;
    }
    dataBarKashir.push(
      (counter / KshirotPerMakat[i].kshirotPerNumber.length) * 100
    );
    counter = 0;
  }
  for (let i = 0; i < dataBarKashir.length; i++) {
    dataBarLoKashir.push(100 - dataBarKashir[i]);
  }
  return { dataKashir: dataBarKashir, dataLoKashir: dataBarLoKashir };
}

export function getPercentageOfKshirutAll(DataForUserArr : DataForUser[]) {//פונקציה שמחזירה אחוזי הכשירות הכללים
  let counter: number = 0;
  for (let i = 0; i < DataForUserArr.length; i++) {
    if (DataForUserArr[i].kshirot === "1") counter++;
  }
  return {numeric: counter , Percentage: (counter/DataForUserArr.length)*100}
}
