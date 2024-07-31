const mongoose = require("mongoose");
const carDatas = require("../model/carDatas");
const verifyToken = require("../function/verifyToken");
const GetIsManeger = require("../function/GetIsManeger");
const convertHebToDb = require("../function/convertHebToDb");

const GetDataForUser = async (req, res) => {
  //פונקציה שמטפלת בבקשת המשתמש למידע על הרכבים הרלוונטים
  if (await verifyToken(req) === true) {
    let isManager = await GetIsManeger(req.body.pernr);
    let DataForUser;
    try {
      if (isManager) {
        DataForUser = await carDatas.find();
        res.json(DataForUser);
      } else {
        DataForUser = await carDatas.find({ gdud: req.body.gdud });
        res.json(DataForUser);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.sendStatus(403);
  }
};
const AddData = async (req, res) => {
  //פונקציה לטיפול בבקשת המשתמש להוספת המידע
  if (await verifyToken(req) === true) {
    req = convertHebToDb(req);
    const insertStatus = await carDatas.create(req.body);
    if (insertStatus !== null) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }else {
    res.sendStatus(401)
  }
};

module.exports = { GetDataForUser, AddData };
