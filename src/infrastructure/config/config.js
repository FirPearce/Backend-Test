const config = {
  port: process.env.PORT || 3000,
  uri: process.env.DB_URL || "mongodb://localhost:27017",
  dbName: process.env.DB_NAME || "libraryDB",
};

module.exports = config;
