### Restriction Service
## Descripción
Este servicio es parte de un sistema de microservicios diseñado para manejar restricciones de estudiantes. Permite a los administradores realizar las siguientes acciones:

- Obtener restricciones: Listar todas las restricciones de un estudiante por su identificador.
- Validar estudiante: Validar si un estudiante tiene restricciones o no.
- Asignar restricción: Asignar una nueva restricción a un estudiante.
- Eliminar restricción: Retirar una restricción existente de un estudiante.

El servicio interactúa con una base de datos Firestore y está desarrollado usando Node.js y Express. Además, utiliza identificadores únicos generados por UUID v4 para cada restricción.
