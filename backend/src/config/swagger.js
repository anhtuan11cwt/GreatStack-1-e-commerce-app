import swaggerJsdoc from "swagger-jsdoc";

const options = {
  apis: ["./src/routes/*.js"],
  definition: {
    info: {
      description: "Tài liệu API cho backend thương mại điện tử",
      title: "API Thương mại điện tử",
      version: "1.0.0",
    },
    openapi: "3.0.0",
    servers: [
      {
        description: "Máy chủ phát triển",
        url: "http://localhost:4000",
      },
    ],
  },
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
