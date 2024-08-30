
const user = require('../models/modelo-usuario');

class RepositorioUsuario {
  async findByEmail(email) {
    return user.findOne({
      where: { email },
    });
  }

  async findById(uuid) {
    return user.findOne({
      attributes: ['id', 'uuid', 'name', 'email', 'role'],
      where: { uuid },
    });
  }
}

module.exports = new RepositorioUsuario();
