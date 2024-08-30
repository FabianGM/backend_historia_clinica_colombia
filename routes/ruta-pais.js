const express = require('express');
const {
    getPaises,
    getPaisById,
    createPais,
} = require('../controllers/controlador-pais');

const { verificarToken: verifyToken, adminOnly } = require('../middleware/autenticacion-usuario');

const router = express.Router();

router.get('/paises', verifyToken, adminOnly, getPaises);
router.get('/paises/:id', verifyToken, adminOnly, getPaisById);
router.post('/paises', verifyToken, adminOnly, createPais);

module.exports = router;
