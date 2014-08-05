var Http = require('./Http').Http;

var Car = function() {
    this.http = new Http();
    
    this.bar = function() {
        return 'bar'
    };
    
    this.foo = function() {
        return this.bar();
    };
    
    this.getInfo = function() {
        return this.http.get('http://google.com');
    }
};

exports.Car = Car;