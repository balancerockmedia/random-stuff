var Employee = function(name, title) {
  'use strict';
  
  this.name = name;
  this.title = title;

  this.changeTitle = function(title) {
    this.title = title;
  };
};

module.exports = Employee;