const mongoose = require("mongoose");
const user = require("../model/user");
const jwt = require("jsonwebtoken");
const verifyToken = require("../function/verifyToken");
const GetIsManeger = require("../function/GetIsManeger");

const login = async (req, res) => {
  try {
    const UserProfileDb = await user.findOne({ pernr: req.body.pernr });
    if (UserProfileDb === null) {
      res.sendStatus(401);
    } else {
      const accessToken = jwt.sign(
        { pernr: req.body.pernr },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        pernr: UserProfileDb.pernr,
        gdud: UserProfileDb.gdud,
        token: accessToken,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const verifyJWT = async (req, res) => {
  if (await verifyToken(req) === true) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
};

const isManager = async (req, res) => {
  if (await verifyToken(req) === true) {
    if (await GetIsManeger(req.body.pernr)) {
      res.json({
        isManeger: true,
      });
    } else {
      res.json({
        isManeger: false,
      });
    }
  } else {
    res.sendStatus(401);
  }
};


module.exports = { login, verifyJWT, isManager };
