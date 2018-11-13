'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    employeeName: DataTypes.STRING,
    statement: DataTypes.STRING,
    date_created: DataTypes.DATE
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};