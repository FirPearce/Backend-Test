const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API Test",
      version: "1.0.0",
      description:
        "A simple Express Library API made with Express and documented with Swagger",
      contact: {
        name: "Firly Taufikurohman",
        url: "https://firpearce.github.io/Portfolio-FirlyTaufikr",
        email: "ftaufikrr@gmail.com",
      },
      servers: [
        {
          url: "http://localhost:3000/",
        },
      ],
    },
  },
  apis: ["./src/app/routes/*.js"],
};

module.exports = options;
