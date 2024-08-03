import { DataForDb } from "../../interfaces/DataForDb";

export async function AddDataToDb(dataObj: DataForDb) { //פונקציה להוספת המידע למאגר המידע
  const response = await fetch("http://localhost:3001/AddData", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3001",
    },
    body: JSON.stringify(dataObj),
    mode: "cors",
  });
  if (!response.ok) {
    return false;
  } else return true;
}
