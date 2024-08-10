const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const config = require("./infrastructure/config/config");
const mongoDbConnection = require("./infrastructure/config/database");
const router = require("./app/routes/index");
// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger");
const swaggerJsdoc = require("swagger-jsdoc");

dotenv.config();

const apiRoot = process.env.API_ROOT;
mongoDbConnection(config, mongoose);

app.use(bodyParser.json());

const spacs = swaggerJsdoc(swaggerDocument);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spacs));
app.use(apiRoot, router.bookRouter());
app.use(apiRoot, router.memberRouter());
app.use(apiRoot, router.loanRouter());
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  console.log(
    `Swagger doc is running on http://localhost:${config.port}/api-docs`
  );
});

module.exports = app;
