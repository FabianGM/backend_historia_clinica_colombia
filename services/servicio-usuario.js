// services/UserService.js
const repositorioUsuario = require('../repository/repositorio-usuario');
const bcrypt = require('bcrypt');

class UserService {
  async obtenerUsuarios() {
    return repositorioUsuario.findAll();
  }

  async obtenerUsuarioId(id) {
    const user = await repositorioUsuario.findById(id);
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  }

  async crearUsuario(data) {
    if (data.password !== data.confPassword) throw new Error('La contraseña no coincide');
    const hashPassword = await bcrypt.hash(data.password, 10);
    return repositorioUsuario.create({
      name: data.name,
      email: data.email,
      password: hashPassword,
      role: data.role,
    });
  }

  async actualizarUsuario(id, data) {
    const user = await repositorioUsuario.findById(id);
    if (!user) throw new Error('User not found');

    let hashPassword = user.password;
    if (data.password) {
      if (data.password !== data.confPassword) throw new Error('La contraseña no coincide');
      hashPassword = await bcrypt.hash(data.password, 10);
    }

    return repositorioUsuario.update(id, {
      name: data.name,
      email: data.email,
      password: hashPassword,
      role: data.role,
    });
  }

  async eliminarUsuario(id) {
    const user = await repositorioUsuario.findById(id);
    if (!user) throw new Error('Usuario no encontrado');
    return repositorioUsuario.delete(id);
  }
}

module.exports = new UserService();
