# Restriction Service
## Descripción
Este servicio es parte de un sistema de microservicios diseñado para manejar restricciones de estudiantes. Permite a los administradores realizar las siguientes acciones:

- Obtener restricciones: Listar todas las restricciones de un estudiante por su identificador.
- Validar estudiante: Validar si un estudiante tiene restricciones o no.
- Asignar restricción: Asignar una nueva restricción a un estudiante.
- Eliminar restricción: Retirar una restricción existente de un estudiante.

El servicio interactúa con una base de datos Firestore y está desarrollado usando Node.js y Express. Además, utiliza identificadores únicos generados por UUID v4 para cada restricción.

## Tecnologías usadas:
- Node.js
- Express
- Firebase Firestore
- Swagger para la documentación de la API

- ## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/coralinegrl/restrictions-service.git

2. Instala las dependencias:
   ```bash
   npm install

## Configuración de Firebase Firestore
Crear un proyecto en Firebase:

Visita Firebase Console y crea un nuevo proyecto.
Habilitar Firestore:

En el panel del proyecto, navega a Firestore Database y haz clic en "Crear base de datos". Elige el modo que prefieras (modo de prueba o producción).
### Obtener credenciales de Firebase:

Ve a Configuración del proyecto > Cuentas de servicio y genera una nueva clave privada. Guarda el archivo firebase-adminsdk.json.

### Variables de entorno:

Copia las credenciales relevantes de este archivo en el .env:

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

Integración en el proyecto:

Asegúrate de que tu archivo firebase.js inicialice correctamente el SDK de Firebase con las variables de entorno cargadas.
   
3. Configura las variables de entorno creando un archivo .env en la raíz del proyecto con los siguientes valores:
   ```bash
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY=your_private_key
   FIREBASE_CLIENT_EMAIL=your_client_email

4. Inicia el servidor localmente:
   ```bash
   npm start

5. Accede a la documentación de Swagger:
Localmente: http://localhost:3000/api-docs
Producción: https://your-production-url/api-docs

## Endpoints de la API
Obtener todas las restricciones
- GET /restrictions
  
Validar si un estudiante tiene restricciones
- GET /restrictions/validate/{studentId}
  
Agregar una restricción
- POST /restrictions

{
  "studentId": "string",
  "reason": "string"
}

Eliminar una restricción
- DELETE /restrictions/{id}


## Documentación con Swagger

La documentación de la API está disponible usando Swagger. Accede a la interfaz en:

- Localmente: http://localhost:3000/api-docs
- Producción: http://restrictions-service.onrender.com/api-docs
  
##Despliegue en Render
Este servicio está desplegado en Render. Para configurarlo, asegúrate de definir las variables de entorno requeridas (como las credenciales de Firebase) en el panel de Render. Las variables incluyen:

FIREBASE_PROJECT_ID
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
