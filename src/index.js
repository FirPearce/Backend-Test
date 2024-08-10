const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const config = require("./infrastructure/config/config");
const mongoDbConnection = require("./infrastructure/config/database");
const router = require("./app/routes/index");

dotenv.config();

const apiRoot = process.env.API_ROOT;
mongoDbConnection(config, mongoose);

app.use(bodyParser.json());

app.use(apiRoot, router.bookRouter());
app.use(apiRoot, router.memberRouter());
app.use(apiRoot, router.loanRouter());
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

module.exports = app;
