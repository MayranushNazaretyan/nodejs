const UsersModel = require('../models/User');
const sequelize = require('../database');
const Sequelize = require('sequelize');

const User = UsersModel(sequelize, Sequelize);

exports.getAllUsers = function (req, res) {
    User
        .findAll()
        .then(users => {
            console.log(users,'------------');
            return res.json(users)
        })
        .catch(error => res.send(error));
};

