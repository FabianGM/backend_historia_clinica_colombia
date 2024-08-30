// controllers/UsersController.js
const servicioUsuario = require('../services/servicio-usuario');

exports.obtenerUsuario = async (req, res) => {
  try {
    const users = await servicioUsuario.obtenerUsuarios();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

exports.obtenerUsuarioId = async (req, res) => {
  try {
    const user = await servicioUsuario.obtenerUsuarioId(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

exports.crearUsuario = async (req, res) => {
  try {
    await servicioUsuario.crearUsuario(req.body);
    res.status(201).json({ msg: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

exports.actualizarUsuario = async (req, res) => {
  try {
    await servicioUsuario.actualizarUsuario(req.params.id, req.body);
    res.status(200).json({ msg: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

exports.eliminarUsuario = async (req, res) => {
  try {
    await servicioUsuario.eliminarUsuario(req.params.id);
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}
