// services/AuthService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const repositorioUsuario = require('../repository/repositorio-autenticacion');

class ServicioAutenticacion {
  async iniciarSesion(email, password) {
    const user = await repositorioUsuario.findByEmail(email);
    if (!user) {
      throw new Error('No existe ese usuario');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('Contraseña incorrecta');
    }

    // Generar el token JWT
    const token = jwt.sign({ id: user.uuid, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '3h',
    });

    return { token };
  }

  async perfil(uuid) {
    const user = await repositorioUsuario.findById(uuid);
    if (!user) {
      throw new Error('No existe ese usuario');
    }
    return user;
  }
}

module.exports = new ServicioAutenticacion();
