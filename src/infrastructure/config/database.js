const connectToMongo = (config, mongoose) => {
  const connection = () => {
    mongoose
      .connect(`${config.uri}/${config.dbName}`)
      .then(() => {})
      .catch((error) => {
        console.log("Error connecting to the database: ", error);
        return process.exit(1);
      });
  };
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });
  mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
    setTimeout(() => connection(), 10000);
  });
  mongoose.connection.on("error", (err) => {
    console.log(`Could not connect to MongoDB because of ${err}`);
    return process.exit(1);
  });
  return connection();
};

module.exports = connectToMongo;
