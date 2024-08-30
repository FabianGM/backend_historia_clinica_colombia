const express = require('express');
const {
    obtenerUsuario,
    obtenerUsuarioId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/controlador-usuario');

const { verificarToken, adminOnly } = require('../middleware/autenticacion-usuario');

const router = express.Router();

router.get('/users', verificarToken, obtenerUsuario);
router.get('/users/:id', verificarToken, obtenerUsuarioId);
router.post('/users', verificarToken, crearUsuario);
router.patch('/users/:id', verificarToken, actualizarUsuario);
router.delete('/users/:id', verificarToken, eliminarUsuario);

module.exports = router;

