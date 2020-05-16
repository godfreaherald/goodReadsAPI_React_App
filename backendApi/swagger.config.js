import swaggerJSDoc from "swagger-jsdoc";
// swagger definition
var swaggerDefinition = {
  info: {
    title: "GoodReads API Docs",
    version: "1.0.0",
    description: "GoodReads RESTful API Docs",
  },
  host: "localhost:8080",
  basePath: "/user",
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ["./routes/*.js"],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
