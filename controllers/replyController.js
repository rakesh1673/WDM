const Reply = require("../models/reply");
const Email = require("../models/email");

exports.sendReply = async (req, res) => {
  const { originalEmailId, replyBody } = req.body;
  const senderId = req.userId;

  try {
    const originalEmail = await Email.findByPk(originalEmailId);

    if (!originalEmail) {
      return res.status(404).json({ error: "Original email not found" });
    }

    const newEmail = await Email.create({
      senderId,
      receiverId: originalEmail.senderId, // Assuming the reply is sent to the original sender
      subject: `Re: ${originalEmail.subject}`,
      body: replyBody,
    });

    res.status(201).json(newEmail);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send reply", details: error.message });
  }
};

// exports.sendReply = async (req, res) => {
//   const { body, emailId } = req.body;
//   const userId = req.userId;

//   try {
//     const email = await Email.findOne({ where: { id: emailId } });
//     if (!email) {
//       return res.status(404).json({ error: "Email not found" });
//     }

//     const reply = await Reply.create({ body, emailId, userId });
//     res.status(201).json({ message: "Reply sent successfully", reply });
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

exports.getReplies = async (req, res) => {
  const { emailId } = req.params;

  try {
    const parsedEmailId = parseInt(emailId, 10); // Parse emailId as integer

    const replies = await Reply.findAll({
      where: { parsedEmailId },
      include: [{ model: User }],
    });

    if (!replies || replies.length === 0) {
      return res.status(404).json({ error: "No replies found for this email" });
    }

    res.status(200).json({ replies });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
