const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "rxm0966_emailsystem2",
  "rxm0966_rakesh2",
  "Rakesh@1673",
  {
    host: "51.81.160.157",
    dialect: "mysql",
  }
);

module.exports = sequelize;
