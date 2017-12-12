'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reviews', {
      reviewId: {
        allowNull: false,
        autoIncrement: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      productId: {
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        },
        type: Sequelize.STRING
      },
      author: {
        allowNull: false,
        type: Sequelize.STRING
      },
      text: {
        allowNull: false,
        type: Sequelize.TEXT
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('reviews');
  }
};