const Email = require("../models/email");
const User = require("../models/user");
const { Op } = require("sequelize");

exports.sendEmail = async (req, res) => {
  const { subject, body, recipientEmail } = req.body;
  const senderId = req.userId; // senderId will be available from the auth middleware

  try {
    const recipient = await User.findOne({ where: { email: recipientEmail } });

    if (!recipient) {
      return res.status(404).json({ error: "Recipient not found" });
    }

    const newEmail = await Email.create({
      subject,
      body,
      senderId,
      receiverId: recipient.id,
    });

    res.status(201).json(newEmail);
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
};

exports.getEmails = async (req, res) => {
  const userId = req.userId;

  try {
    const sentEmails = await Email.findAll({
      where: { senderId: userId },
      include: [{ model: User, as: "Receiver" }],
    });
    const receivedEmails = await Email.findAll({
      where: { receiverId: userId },
      include: [{ model: User, as: "Sender" }],
    });

    res.status(200).json({ sentEmails, receivedEmails });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getEmailById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const email = await Email.findOne({
      where: { id, [Op.or]: [{ senderId: userId }, { receiverId: userId }] },
    });
    if (!email) {
      return res.status(404).json({ error: "Email not found" });
    }
    res.status(200).json({ email });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
