'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                firstName: 'Ann',
                lastName: 'Doe',
                email: 'demo@demo.com'
            },{
                firstName: 'John',
                lastName: 'Doe',
                email: 'demo@demo.com'
            },{
                firstName: 'Dave',
                lastName: 'Doe',
                email: 'demo@demo.com'
            },{
                firstName: 'Jo',
                lastName: 'Doe',
                email: 'demo@demo.com'
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
       // return queryInterface.bulkDelete('Users', null, {});
    }
};
