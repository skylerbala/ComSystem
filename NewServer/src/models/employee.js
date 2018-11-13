'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    date_created: DataTypes.DATE
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
  };
  return Employee;
};