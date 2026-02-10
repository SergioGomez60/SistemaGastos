const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: config.logging,
  pool: config.pool
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User')(sequelize, Sequelize);
db.Expense = require('./Expense')(sequelize, Sequelize);

// Define relationships
db.User.hasMany(db.Expense, { foreignKey: 'userId' });
db.Expense.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
