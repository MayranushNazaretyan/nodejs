const Sequelize = require('sequelize');
const development = require('../config/config.json');

const { database, username, password } = development.development;
const options = { dialect: 'postgres' };
const connection = new Sequelize(database, username, password, options);

connection
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = connection;
