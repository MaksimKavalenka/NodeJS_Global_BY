'use strict';
module.exports = (sequelize, DataTypes) => {
  var review = sequelize.define('review', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    productId: DataTypes.STRING,
    author: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Model.belongsTo(models.products);
      }
    },
    indexes: [{
      name: 'indexProductId',
      type: 'UNIQUE',
      fields: ['productId']
    }],
    timestamps: false
  });
  return review;
};