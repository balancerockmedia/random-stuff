'use strict';

function Employee() {
  this.World = require("../../support/world.js").World;
  
  this.Given(/^an employee with the name of "([^"]*)" and a title of "([^"]*)"$/, function(arg1, arg2, callback) {
    this.employee = new this.Employee(arg1, arg2);
    
    callback();
  });

  this.Then(/^their name should be "([^"]*)"$/, function(arg1, callback) {
    if (this.employee.name === arg1) {
      callback();
    } else {
      callback.fail(new Error("Found employee name " + this.employee.name + ", but expected " + arg1));
    }
  });
  
  this.Then(/^their title should be "([^"]*)"$/, function(arg1, callback) {
    if (this.employee.title === arg1) {
      callback();
    } else {
      callback.fail(new Error("Found employee title " + this.employee.title + ", but expected " + arg1));
    }
  });

  this.When(/^I can change their title to "([^"]*)"$/, function(arg1, callback) {
    this.employee.changeTitle(arg1);
    
    callback();
  });

  this.Then(/^their new title should be "([^"]*)"$/, function(arg1, callback) {
    if (this.employee.title === arg1) {
      callback();
    } else {
      callback.fail(new Error("Found employee title " + this.employee.title + ", but expected " + arg1));
    }
    
    callback();
  });
};

module.exports = Employee;
