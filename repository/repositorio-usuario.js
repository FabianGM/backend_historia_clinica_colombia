
const user = require('../models/modelo-usuario');

class RepositorioUsuario {
  async findAll() {
    return user.findAll({
      attributes: ['uuid', 'name', 'email', 'role']
    });
  }

  async findById(id) {
    return user.findOne({
      attributes: ['uuid', 'name', 'email', 'role'],
      where: { uuid: id }
    });
  }

  async create(data) {
    return user.create(data);
  }

  async update(id, data) {
    return user.update(data, { where: { uuid: id } });
  }

  async delete(id) {
    return user.destroy({ where: { uuid: id } });
  }
}

module.exports = new RepositorioUsuario();
