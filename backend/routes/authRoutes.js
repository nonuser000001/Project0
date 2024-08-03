const express = require("express");
const userController = require("../controllers/UserController")

const router = express.Router();

router.post("/login", userController.login);

router.post("/verifyJWT", userController.verifyJWT);

router.post("/isManager",userController.isManager );

module.exports = router;