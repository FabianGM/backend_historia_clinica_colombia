const { Sequelize } = require("sequelize");
require('dotenv').config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Probar la conexión
db.authenticate()
  .then(() => {
    console.log('La conexión a la base de datos fue exitosa.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = db;
