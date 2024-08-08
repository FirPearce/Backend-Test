const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

require("dotenv/config");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURL = process.env.MONGO_URI || process.env.DB_CONNECTION;

mongoose.connect(mongoURL);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to database");
});
