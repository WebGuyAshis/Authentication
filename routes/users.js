const express = require("express");
const router = express.Router();
const middleWares = require('../middlewares/jwt_middlewares')
const userController = require("../controllers/user_controller");

router.post("/create", userController.create);

router.post("/login",middleWares.generateToken, userController.login);

router.get("/profile",middleWares.verifyToken, userController.profile);

router.get('/logout', userController.logout);

module.exports = router;
