var assert = require('chai').assert;
var sinon = require('sinon');

var Car = require('./src/Car').Car;
var Http = require('./src/Http').Http;

describe('Car', function() {
    var car, http;
    
    beforeEach(function() {
       car = new Car();
    });
    
    describe('foo()', function() {
        
        // use a spy to just look at params, return value and number of times method was called, but bar() still executes
        it('should test using a spy', function() {
            var spy = sinon.spy(car, 'bar');
            
            var answer = car.foo();
            
            sinon.assert.calledOnce(spy);
            
            assert.strictEqual(answer, 'bar');
            
            car.bar.restore();
        });
        
        // use a stub to do everything a spy can, but stops bar() from executing and allows you to define behavior
        it('should test using a stub', function() {
            var stub = sinon.stub(car, 'bar');
            
            var answer = car.foo();
            
            sinon.assert.calledOnce(stub);
            
            assert.strictEqual(typeof answer, 'undefined');
            
            car.bar.restore();
        });
    
        // defined a return value for bar()
        it('should test using a stub and customize the return value for bar()', function() {
            var stub = sinon.stub(car, 'bar');
            stub.returns('wat');
            
            var answer = car.foo();
            
            sinon.assert.calledOnce(stub);
            
            assert.strictEqual(answer, 'wat');
            
            car.bar.restore();
        });
        
        // test Http module
        it('should test Http', function() {
            var spy = sinon.spy(car.http, 'get');
            
            var answer = car.getInfo();
            
            sinon.assert.calledOnce(spy);
            sinon.assert.calledWith(spy, 'http://google.com');
            
            assert.strictEqual(answer, 'test');
            
            car.http.get.restore();
        });
        
    });
});