const express = require("express");
const {
  signup,
  login,
  getUserProfile,
} = require("../controllers/authController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", auth, getUserProfile);

module.exports = router;
