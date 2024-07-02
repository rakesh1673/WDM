// models/email.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Email = sequelize.define("Email", {
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  receiverId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

User.hasMany(Email, { as: "SentEmails", foreignKey: "senderId" });
User.hasMany(Email, { as: "ReceivedEmails", foreignKey: "receiverId" });
Email.belongsTo(User, { as: "Sender", foreignKey: "senderId" });
Email.belongsTo(User, { as: "Receiver", foreignKey: "receiverId" });

module.exports = Email;
