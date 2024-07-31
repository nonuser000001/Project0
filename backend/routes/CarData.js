const express = require("express");
const CarDatasControllers = require("../controllers/CarDatasController.js")

const router = express.Router();

router.post("/GetDataForUser", CarDatasControllers.GetDataForUser );
  router.post("/AddData", CarDatasControllers.AddData);

module.exports = router;