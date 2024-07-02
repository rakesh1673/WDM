const Draft = require("../models/draft");

exports.saveDraft = async (req, res) => {
  const { subject, body, recipientMail } = req.body;
  const userId = req.userId;

  try {
    const draft = await Draft.create({
      subject: subject || null,
      body: body || null,
      recipientMail: recipientMail || null,
      userId,
    });

    res.status(201).json({ message: "Draft saved successfully", draft });
  } catch (error) {
    console.error("Error saving draft:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getDrafts = async (req, res) => {
  const userId = req.userId;

  try {
    const drafts = await Draft.findAll({ where: { userId } });
    res.status(200).json({ drafts });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getDraftById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const draft = await Draft.findOne({ where: { id, userId } });
    if (!draft) {
      return res.status(404).json({ error: "Draft not found" });
    }
    res.status(200).json({ draft });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.updateDraft = async (req, res) => {
  const { id } = req.params;
  const { subject, body, recipientMail } = req.body;
  const userId = req.userId;

  try {
    const draft = await Draft.findOne({ where: { id, userId } });
    if (!draft) {
      return res.status(404).json({ error: "Draft not found" });
    }

    draft.subject = subject || draft.subject || null;
    draft.body = body || draft.body || null;
    draft.recipientMail = draft.recipientMail || recipientMail || null;

    await draft.save();

    res.status(200).json({ message: "Draft updated successfully", draft });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.deleteDraft = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const draft = await Draft.findOne({ where: { id, userId } });
    if (!draft) {
      return res.status(404).json({ error: "Draft not found" });
    }

    await draft.destroy();
    res.status(200).json({ message: "Draft deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
