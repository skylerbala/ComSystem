'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    ringtone: DataTypes.STRING
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
  };
  return Employee;
};