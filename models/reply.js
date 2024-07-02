const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Email = require("./email");

const Reply = sequelize.define("Reply", {
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  emailId: {
    type: DataTypes.INTEGER,
    references: {
      model: Email,
      key: "id",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

Email.hasMany(Reply, { foreignKey: "emailId" });
Reply.belongsTo(Email, { foreignKey: "emailId" });

User.hasMany(Reply, { foreignKey: "userId" });
Reply.belongsTo(User, { foreignKey: "userId" });

module.exports = Reply;
