var assert = require('assert');

var MathHelpers = require('./mathHelpers').MathHelpers;
var Car = require('./Car').Car;

// mocha --reporter spec --timeout 5000

describe('MathHelpers', function() {
    describe('add()', function() {
        it('should return 3 when called with 1,2', function() {
            assert.strictEqual(MathHelpers.add(1,2), 3);
        });
    });
    
    describe('summation()', function() {
        it('should return 10 when called with 4', function() {
            assert.strictEqual(MathHelpers.summation(4), 10);
        });
        
        it('should return 15 when called with 5', function() {
            assert.strictEqual(MathHelpers.summation(5), 15);
        });
    });
});

describe('Car', function() {
    beforeEach(function() {
       this.car = new Car(); 
    });
    
    describe('color', function() {
        it('should be red', function() {
            assert.strictEqual(this.car.color, 'red');
        });
    });
    
    describe('make', function() {
        it('should be Ford', function() {
            assert.strictEqual(this.car.make, 'Ford');
        });
    });
    
    describe('drive()', function() {
        it('should return driving...', function() {
            assert.strictEqual(this.car.drive(), 'driving...');
        });
    });
    
    describe('paint()', function() {
        it('should paint the car blue', function(done) {
            var car = this.car;
            
            car.paint('blue', function() {
                assert.strictEqual(car.color, 'blue');
                
                done();
            });
        });
    });
});