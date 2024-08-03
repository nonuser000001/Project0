const mongoose = require("mongoose");

const carDatasSchema = new mongoose.Schema({
  carNumber: { type: String },
  makat: { type: String },
  kshirot: { type: String },
  gdud: { type: String },
});

const carDatas = mongoose.model("carDatas", carDatasSchema , "carDatas");

module.exports = carDatas;
