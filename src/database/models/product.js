'use strict';
module.exports = (sequelize, DataTypes) => {
  var product = sequelize.define('product', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    company: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    isbn: DataTypes.STRING
  }, {
    indexes: [{
      name: 'indexBrand',
      type: 'UNIQUE',
      fields: ['brand']
    }],
    timestamps: false
  });
  return product;
};