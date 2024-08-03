import {UserCredentials} from '../../interfaces/userCredentials'

export default async function GetDataForUser(UserProfile:UserCredentials) {//פונקציה לקבלת המידע בשביל המשתמש הרלוונטי

    const response = await fetch("http://localhost:3001/GetDataForUser" , {
        method:'POST',
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": 'http://localhost:3001',
        },
        body: JSON.stringify({"pernr" : UserProfile }),
        mode: 'cors',
      })
}
//currently not in use 