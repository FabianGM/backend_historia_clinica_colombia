const express = require('express');
const {
    getHistorias,
    getHistoriaById,
    createHistoria,
    updateHistoria,
    deleteHistoria
} = require('../controllers/controlador-historia-clinica');

const { verificarToken: verifyToken } = require('../middleware/autenticacion-usuario');

const router = express.Router();

router.get('/historias', verifyToken, getHistorias);
router.get('/historias/:id', verifyToken, getHistoriaById);
router.post('/historias', verifyToken, createHistoria);
router.patch('/historias/:id', verifyToken, updateHistoria);
router.delete('/historias/:id', verifyToken, deleteHistoria);

module.exports = router;
