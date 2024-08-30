const express = require('express');
const { iniciarSesion, cerrarSesion, perfil } = require('../controllers/controlador-autenticacion');
const { verificarToken } = require('../middleware/autenticacion-usuario');
const router = express.Router();

// Ruta protegida que requiere token JWT
router.get('/perfil', verificarToken, perfil); 

// Ruta para iniciar sesión (no requiere token)
router.post('/iniciar-sesion', iniciarSesion);

// Ruta para cerrar sesión (no requiere token)
router.delete('/cerrar-sesion', cerrarSesion);

module.exports = router;
