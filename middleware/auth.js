/* const jwt = require('jsonwebtoken');

//validar el token JWT
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // obtener el token del header "Authorization"
  if (!token) return res.status(401).send('access denied'); //si no hay token, rechazar la solicitud

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET); //verificar el token con la clave secreta (desde main)
    req.user = verified; //almacenar los datos del token en la solicitud
    next(); 
  } catch (err) {
    res.status(400).send('Invalid Token'); 
  }
}

module.exports = authenticateToken; */
