const express = require('express');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const serviceAccount = require('./firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(express.json()); // Para poder leer el body de las solicitudes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

// Test endpoint
app.get('/', (req, res) => {
  res.send('Restrictions Service is running!');
});

//obtener restricciones
app.get('/restrictions/:studentId', async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const restrictionsRef = db.collection('restrictions');
      const snapshot = await restrictionsRef.where('studentId', '==', studentId).get();
  
      if (snapshot.empty) {
        return res.status(404).send('El estudiante no tiene restricciones.');
      }
  
      let restrictions = [];
      snapshot.forEach(doc => {
        restrictions.push(doc.data());
      });
  
      res.status(200).json(restrictions);
    } catch (error) {
      res.status(500).send('Error al obtener las restricciones: ' + error.message);
    }
  });

//validar si un estudiante tiene restricciones
app.get('/validate/:studentId', async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const restrictionsRef = db.collection('restrictions');
      const snapshot = await restrictionsRef.where('studentId', '==', studentId).get();
  
      if (snapshot.empty) {
        return res.status(200).send('El estudiante no tiene restricciones.');
      }
  
      res.status(403).send('El estudiante tiene restricciones.');
    } catch (error) {
      res.status(500).send('Error validando estudiante: ' + error.message);
    }
  });

//asignar una restricción (solo administrador)
app.post('/restrictions', async (req, res) => {
    try {
      const { studentId, reason } = req.body;
      if (!studentId || !reason) {
        return res.status(400).send('La razón y el id del estudiante son requeridos.');
      }
  
      const restriction = {
        id: uuidv4(),
        studentId,
        reason,
        createdAt: new Date()
      };
  
      await db.collection('restrictions').doc(restriction.id).set(restriction);
  
      res.status(201).send('Restricción agregada exitosamente.');
    } catch (error) {
      res.status(500).send('Error al agregar restricción: ' + error.message);
    }
  });

//retirar una restricción (solo administrador)
app.delete('/restrictions/:id', async (req, res) => {
    try {
      const restrictionId = req.params.id;
  
      await db.collection('restrictions').doc(restrictionId).delete();
  
      res.status(200).send('Restricción eliminada exitosamente.');
    } catch (error) {
      res.status(500).send('Error eliminando restricción: ' + error.message);
    }
  });

