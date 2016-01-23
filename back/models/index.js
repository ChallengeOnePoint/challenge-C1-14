var Sequelize = require('sequelize');
var path = require('path');

const sequelize = new Sequelize("sqlite://back.db");

var Address = sequelize.define('address', {
  number: { type: Sequelize.INTEGER, allowNull: false },
  street: { type: Sequelize.STRING, allowNull: false },
  city: { type: Sequelize.STRING, allowNull: false },
  postcode: { type: Sequelize.STRING, allowNull: false },
  firstname: { type: Sequelize.STRING, allowNull: false },
  lastname: { type: Sequelize.STRING, allowNull: false },
  lat: { type: Sequelize.DOUBLE, allowNull: false },
  long: { type: Sequelize.DOUBLE, allowNull: false }
});

Address.sync();

module.exports.Address = Address;
module.exports.sequelize = sequelize;
