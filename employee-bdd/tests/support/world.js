'use strict';

var Employee = require('../../src/Employee.js');

var World = function World(callback) {

  var world = {
    Employee: Employee
  };

  callback(world);
};

exports.World = World;