'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expression = sequelize.define('Expression', {
    content: DataTypes.STRING,
    type: DataTypes.INTEGER
  }, {});
  Expression.associate = function(models) {
    // associations can be defined here
  };
  return Expression;
};