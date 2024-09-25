const express = require('express');
const { v4: uuidv4 } = require('uuid'); //identificadores únicos para las restricciones
const db = require('../config/firebase'); //importar firestore
const authenticateToken = require('../middleware/auth'); //middleware de autenticación
const router = express.Router();

//obtener todas las restricciones de un estudiante
router.get('/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    console.log(`fetching restrictions for studentId: ${studentId}`);
    const restrictionsRef = db.collection('restrictions');
    const snapshot = await restrictionsRef.where('studentId', '==', studentId).get();

    if (snapshot.empty) {
      return res.status(404).send('no se encontraron restricciones en este estudiante.');
    }

    let restrictions = [];
    snapshot.forEach(doc => restrictions.push(doc.data()));
    res.status(200).json(restrictions);
  } catch (error) {
    res.status(500).send('error al cargar restricciones: ' + error.message);
  }
});

//validar si un estudiante tiene restricciones
router.get('/validate/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const restrictionsRef = db.collection('restrictions');
    const snapshot = await restrictionsRef.where('studentId', '==', studentId).get();

    if (snapshot.empty) {
      return res.status(200).send('este estudiante no tiene restricciones.');
    }

    res.status(403).send('este estudiante sí tiene restricciones.');
  } catch (error) {
    res.status(500).send('error al validar estudiante: ' + error.message);
  }
});

//asignar una nueva restricción (solo admin)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { studentId, reason } = req.body;
    if (!studentId || !reason) {
      return res.status(400).send('ID del estudiante y razón de restricción son requeridas.');
    }

    const restriction = {
      id: uuidv4(), //identificador único para la restricción
      studentId,
      reason,
      createdAt: new Date()
    };

    await db.collection('restrictions').doc(restriction.id).set(restriction);
    res.status(201).send('restricción agregada exitosamente.');
  } catch (error) {
    res.status(500).send('error al agregar restricción: ' + error.message);
  }
});

//eliminar una restricción (solo admin)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const restrictionId = req.params.id;
    await db.collection('restrictions').doc(restrictionId).delete();
    res.status(200).send('restricción eliminada exitosamente.');
  } catch (error) {
    res.status(500).send('error eliminando restricción: ' + error.message);
  }
});

module.exports = router;
