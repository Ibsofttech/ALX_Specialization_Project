const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

module.exports = router;
