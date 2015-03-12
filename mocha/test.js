var assert = require('assert');

var MathHelpers = require('./mathHelpers').MathHelpers;

// mocha --reporter spec

describe('MathHelpers', function() {
    describe('add()', function() {
        it('should return 3 when called with 1,2', function() {
            assert.strictEqual(MathHelpers.add(1,2), 3);
        });
    });
    
    describe('myFunction()', function() {
        it('should return 6 when called with [1, 2, 3, 4, 5]', function() {
            assert.strictEqual(MathHelpers.myFunction([1, 2, 3, 4, 5]), 6);
        });
        
        it('should return 4 when called with [1, 5, 4]', function() {
            assert.strictEqual(MathHelpers.myFunction([1, 5, 4]), 4);
        });
    });
});