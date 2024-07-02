const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Draft = sequelize.define("Draft", {
  subject: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null so recipientMail can be used if provided
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: true, // Allow null so recipientMail can be used if provided
  },
  recipientMail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

User.hasMany(Draft, { foreignKey: "userId" });
Draft.belongsTo(User, { foreignKey: "userId" });

module.exports = Draft;
