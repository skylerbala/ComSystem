'use strict';
module.exports = (sequelize, DataTypes) => {
  const Statement = sequelize.define('Statement', {
    statement: DataTypes.STRING,
    date_created: DataTypes.DATE
  }, {});
  Statement.associate = function(models) {
    // associations can be defined here
  };
  return Statement;
};