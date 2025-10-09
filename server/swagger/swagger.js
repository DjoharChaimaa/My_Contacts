const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Contacts",
      version: "1.0.0",
      description: "API CRUD des contacts protégée par JWT",
    },
    servers: [
      { url: process.env.BACKEND_URL} 
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js", "./models/*.js"],
};

module.exports = swaggerJsdoc(options);
