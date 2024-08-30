const express = require('express');
const {
    getPacientes,
    getPacienteById,
    createPaciente,
    updatePaciente,
    deletePaciente
} = require('../controllers/controlador-paciente');

const { verificarToken: verifyToken } = require('../middleware/autenticacion-usuario');

const router = express.Router();

router.get('/pacientes', verifyToken, getPacientes);
router.get('/pacientes/:id', verifyToken, getPacienteById);
router.post('/pacientes', verifyToken, createPaciente);
router.patch('/pacientes/:id', verifyToken, updatePaciente);
router.delete('/pacientes/:id', verifyToken, deletePaciente);

module.exports = router;
