const servicioAutenticacion = require('../services/servicio-autenticacion');

exports.iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token } = await servicioAutenticacion.iniciarSesion(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.perfil = async (req, res) => {
  try {
    const user = await servicioAutenticacion.perfil(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

exports.cerrarSesion = (req, res) => {
  res.status(200).json({ msg: 'Se ha desconectado con éxito' });
};
