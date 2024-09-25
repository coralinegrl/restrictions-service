const admin = require('firebase-admin');
const serviceAccount = require('../firebase-adminsdk.json'); //ruta al archivo de credenciales de Firebase

//inicializar firebase admin SDK con las credenciales
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//crear la referencia a Firestore
const db = admin.firestore();

//exportar la referencia a Firestore para usarla en otros archivos
module.exports = db;
