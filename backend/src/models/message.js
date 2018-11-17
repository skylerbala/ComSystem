'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    employeeName: DataTypes.STRING,
    statement: DataTypes.STRING,
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};