const admin = require('firebase-admin');
require('dotenv').config(); // Cargar las variables de entorno desde .env

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Importante para manejar correctamente los saltos de línea en la clave privada
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

// Inicializar Firebase Admin SDK con las credenciales cargadas desde las variables de entorno
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Crear la referencia a Firestore
const db = admin.firestore();

// Exportar la referencia a Firestore para usarla en otros archivos
module.exports = db;
