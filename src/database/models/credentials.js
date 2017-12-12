'use strict';
module.exports = (sequelize, DataTypes) => {
  var credentials = sequelize.define('credentials', {
    userId: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    login: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Model.belongsTo(models.users);
      }
    },
    timestamps: false
  });
  return credentials;
};