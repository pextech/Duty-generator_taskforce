import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const router = express.Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Duty generator Api-documentation 😎🇷🇼',
      version: '0.1.0',
      description:
            'This documentation contains a brief introduction of how Duty-generator app works, as suggeted by awesomity-labs (Task-force-challenge) 😎🇷🇼',
      contact: {
        name: 'Mupenzi cedrick 😎🇷🇼',
        phone: '+250780812252',
        linkedin: 'https://www.linkedin.com/in/mupenzi-cedrick-10a158196',
        github: 'https://github.com/pextech',
        url: 'https://pextech.github.io/MyRezume/html/',
        email: 'mcstain1639@gmail.com',
      },
    },
    servers: [
      {
        url: 'https://dutygenerator.herokuapp.com/',
      },
    ],
    produces: ['application/json'],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
router.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);

export default router;
