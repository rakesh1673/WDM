const express = require("express");
const {
  sendEmail,
  getEmails,
  getEmailById,
} = require("../controllers/emailController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/send", auth, sendEmail);
router.get("/", auth, getEmails);
router.get("/:id", auth, getEmailById);

module.exports = router;
