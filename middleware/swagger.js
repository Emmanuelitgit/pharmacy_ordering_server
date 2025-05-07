const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Online Pharmacy Management API',
    version: '1.0.0',
    description: 'API documentation for managing appointments, users, and more.',
  },
   servers: [
    {
      url: 'http://localhost:3000', // or whatever your actual base URL is
      description: 'Local development server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Make sure this path matches where your route files are stored
};

const swaggerConfig = swaggerJSDoc(options);

module.exports = swaggerConfig;