'use strict';
module.exports = (sequelize, DataTypes) => {
  const Statement = sequelize.define('Statement', {
    statement: DataTypes.STRING,
  }, {});
  Statement.associate = function(models) {
    // associations can be defined here
  };
  return Statement;
};