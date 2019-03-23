'use strict';

const products = require('../controllers/products.json');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const date = new Date();
        products.forEach(product => {
            product.createdAt = date;
            product.updatedAt = date;
        });

        return queryInterface.bulkInsert('Products', products, {});
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
    }
};
