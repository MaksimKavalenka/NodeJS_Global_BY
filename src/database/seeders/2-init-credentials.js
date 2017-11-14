'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('credentials', [{
      userId: '1',
      login: 'admin',
      password: 'node123'
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('credentials', null, {});
  }
};