const config = require("./src/config/index");
const express = require("express");
const app = express();

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
