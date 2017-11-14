'use strict';
module.exports = (sequelize, DataTypes) => {
  var credentials = sequelize.define('credentials', {
    userId: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return credentials;
};