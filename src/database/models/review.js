'use strict';
module.exports = (sequelize, DataTypes) => {
  var review = sequelize.define('review', {
    productid: DataTypes.STRING,
    author: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return review;
};