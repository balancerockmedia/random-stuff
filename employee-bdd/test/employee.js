'use strict';

var assert = require("assert");
var Employee = require('../src/Employee.js');

describe('Employee', function() {
  
  var employee;
  
  before(function() {
    employee = new Employee('Dan', 'associate');
  });
  
  describe('Construct', function() {
    it('should set the name', function() {
      assert.equal(employee.name, 'Dan');
    });
    
    it('should set the title', function() {
      assert.equal(employee.title, 'associate');
    });
  });
  
  describe('changeTitle()', function() {
    it('should change the title', function() {
      employee.changeTitle('senior associate');
      assert.equal(employee.title, 'senior associate');
    });
  });
  
});