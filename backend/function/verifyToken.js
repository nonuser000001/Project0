const jwt = require("jsonwebtoken");
const env = require("dotenv");
const user = require("../model/user");
env.config();

const verifyToken = async function verifyToken(req) {
  let response = false;
  const UserProfileDb = await user.findOne({ pernr: req.body.pernr });
  if (UserProfileDb !== null) {
    jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded){
      if(err){
        console.log(err);
        response =  false;
      }else {
        if(decoded.pernr === UserProfileDb.pernr){
          response = true;
        }
      }
    })
  }else {
    response = false;
  }
  return response;
};

module.exports = verifyToken;

//to use this function you must provide to this function pernr and a token props in body