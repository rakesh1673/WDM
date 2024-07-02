const express = require("express");
const {
  saveDraft,
  getDrafts,
  getDraftById,
  updateDraft,
  deleteDraft,
} = require("../controllers/draftController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/save", auth, saveDraft);
router.get("/", auth, getDrafts);
router.get("/:id", auth, getDraftById);
router.put("/:id", auth, updateDraft);
router.delete("/:id", auth, deleteDraft);

module.exports = router;
