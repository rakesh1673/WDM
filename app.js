const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const userRoutes = require("./routes/auth");
const emailRoutes = require("./routes/email");
const draftRoutes = require("./routes/draft");
const replyRoutes = require("./routes/reply");

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

app.use(bodyParser.json());
app.use("/auth", userRoutes);
app.use("/emails", emailRoutes);
app.use("/drafts", draftRoutes);
app.use("/reply", replyRoutes);

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log("Error syncing database", err));

module.exports = app;
