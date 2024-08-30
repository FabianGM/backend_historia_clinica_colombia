const Paciente = require("../models/modelo-paciente");
const User = require("../models/modelo-usuario");
const { Op } = require("sequelize");

// Obtener todos los pacientes, con acceso diferenciado para administradores y usuarios normales
exports.getPacientes = async (req, res) => {
    try {
        const response = await Paciente.findAll({
            attributes: [
                'uuid', 'name', 'tipoDocumentoIdentificacion', 'numDocumentoIdentificacion',
                'fechaNacimiento', 'codSexo', 'codPaisResidencia', 'codMunicipioResidencia'
            ],
            include: [{
                model: User,
                attributes: ['name', 'email']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Obtener un paciente por ID, con acceso diferenciado para administradores y usuarios normales
exports.getPacienteById = async (req, res) => {
    try {
        const paciente = await Paciente.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!paciente) return res.status(404).json({ msg: "No se encontró el paciente" });

        let condition = { id: paciente.id };
        if (req.role !== "admin") {
            condition = { [Op.and]: [{ id: paciente.id }, { userId: req.userId }] };
        }

        const response = await Paciente.findOne({
            attributes: [
                'uuid', 'name', 'tipoDocumentoIdentificacion', 'numDocumentoIdentificacion',
                'fechaNacimiento', 'codSexo', 'codPaisResidencia', 'codMunicipioResidencia'
            ],
            where: condition,
            include: [{
                model: User,
                attributes: ['name', 'email']
            }]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createPaciente = async (req, res) => {
    const { name, tipoDocumentoIdentificacion, numDocumentoIdentificacion, fechaNacimiento, codSexo, codPaisResidencia, codMunicipioResidencia } = req.body;

    try {
        if (!name || !tipoDocumentoIdentificacion || !numDocumentoIdentificacion || !fechaNacimiento || !codSexo || !codPaisResidencia || !codMunicipioResidencia) {
            return res.status(400).json({ msg: "Todos los campos son requeridos" });
        }

        const paciente = await Paciente.create({
            name,
            tipoDocumentoIdentificacion,
            numDocumentoIdentificacion,
            fechaNacimiento,
            codSexo,
            codPaisResidencia,
            codMunicipioResidencia,
            userId: req.user.uuid // Asegúrate de que req.user.id tiene un valor válido
        });

        res.status(201).json(paciente);
    } catch (error) {
        console.error("Error al crear el paciente:", error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};


// Actualizar un paciente existente
exports.updatePaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!paciente) return res.status(404).json({ msg: "No se encontró el paciente" });

        const { name, tipoDocumentoIdentificacion, numDocumentoIdentificacion, fechaNacimiento, codSexo, codPaisResidencia, codMunicipioResidencia } = req.body;

        let condition = { id: paciente.id };
        if (req.role !== "admin" && req.userId !== paciente.userId) {
            return res.status(403).json({ msg: "Acceso prohibido" });
        }

        await Paciente.update({
            name,
            tipoDocumentoIdentificacion,
            numDocumentoIdentificacion,
            fechaNacimiento,
            codSexo,
            codPaisResidencia,
            codMunicipioResidencia
        }, {
            where: condition
        });

        res.status(200).json({ msg: "El paciente se actualizó correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Eliminar un paciente existente
exports.deletePaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!paciente) return res.status(404).json({ msg: "No se encontró el paciente" });

        let condition = { id: paciente.id };
        if (req.role !== "admin" && req.userId !== paciente.userId) {
            return res.status(403).json({ msg: "Acceso prohibido" });
        }

        await Paciente.destroy({
            where: condition
        });

        res.status(200).json({ msg: "Paciente eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
