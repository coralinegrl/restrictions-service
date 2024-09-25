const express = require('express');
const restrictionsRoutes = require('./routes/restrictions'); // Rutas del servicio de restricciones
require('dotenv').config(); 
const app = express();

// middleware para interpretar JSON en el cuerpo de las solicitudes
app.use(express.json());

//rutas del servicio de restricciones
app.use('/restrictions', restrictionsRoutes);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Restrictions Service running on port ${PORT}`);
});
