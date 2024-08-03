const mongoose = require("mongoose");
const user = require("../model/user")

const GetIsManeger = async function GetIsManeger(userPernr) {
  const UserProfile = await user.findOne({ pernr: userPernr });
  if (UserProfile.isManager === "1") {
    return true;
  } else {
    return false;
  }
}

module.exports = GetIsManeger;