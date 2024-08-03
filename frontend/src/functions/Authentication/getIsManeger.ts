import { redirect } from 'react-router';
import {UserCredentials} from '../../interfaces/userCredentials'
export async function getIsManeger(){//פונקציה שבודקת אם המשתמש הינו מנהל
    let userProfile : UserCredentials | any = localStorage.getItem('userProfile')
    if (typeof userProfile === 'string') {
        userProfile = JSON.parse(userProfile);
        const response = await fetch("http://localhost:3001/isManager" , {
          method:'POST',
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:3001',
          },
          body: JSON.stringify(userProfile),
          mode: 'cors',
        })
        const res = await response.json()
        return res.isManeger
    }else {
      redirect('/');
    }
}