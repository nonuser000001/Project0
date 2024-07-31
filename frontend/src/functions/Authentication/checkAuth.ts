import {UserCredentials} from '../../interfaces/userCredentials'
export async function checkAuth(){ //פונקציה לבדיקת גישה למערכת
    let userProfile : UserCredentials | any = localStorage.getItem('userProfile')
    if (userProfile !== null) {
        userProfile = JSON.parse(userProfile);
        const verify = await fetch("http://localhost:3001/verifyJWT" , { //cheack and fix api to verifyToken not to isManeger
          method:'POST',
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:3001',
          },
          body: JSON.stringify(userProfile),
          mode: 'cors',
        })
        if(!verify.ok){
          localStorage.clear();
          return false;
        }
        else{
          return true; 
        }
    }else {
      return false;
    }
}

