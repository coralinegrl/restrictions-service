const express = require('express');
const restrictionsRoutes = require('./routes/restrictions'); // Rutas del servicio de restricciones
require('dotenv').config(); 
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Restrictions Service API',
      version: '1.0.0',
      description: 'API para gestionar restricciones de estudiantes'
    },
    servers: [
      {
        url: 'https://restrictions-service.onrender.com',

      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Bienvenido al servicio de restricciones');
});

// Rutas del servicio de restricciones
app.use('/restrictions', restrictionsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Restrictions Service running on port ${PORT}`);
});
