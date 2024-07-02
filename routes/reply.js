const express = require("express");
const { sendReply, getReplies } = require("../controllers/replyController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/send", auth, sendReply);
router.get("/:emailId", auth, getReplies);

module.exports = router;
