// function declaration, loads before any code is executed because of hoisting
function add() {
    return 1 + 1;
}

// function expression, loads only when the interpreter reaches it in the code
var add = function() {
    return 1 + 1;
};

// // function expression with named function to help in debugging
var add = function add() {
    return 1 + 1;
};

// // functions can take params
function add(num1, num2) {
    return num1 + num2;
}

// // if you have a lot of params then it's best to organize as an object
function buildACar(options) {}

buildACar({
    exteriorColor: 'blue',
    interiorColor: 'black',
    packages: ['premium sound', 'cold weather']
});

// sometimes these params are other functions
function makeRequest(callback) {
    // make the request to the server then execute the callback function
    callback();
}

makeRequest(function() {
    console.log('done!');
});

// and sometimes the params have an object containing functions
function makeRequest(options) {
    // if successful
    options.success();

    // if error
    options.error();
}

makeRequest({
    success: function() {
        console.log('it worked!');
    },
    error: function() {
        console.log('fail!');
    }
});

// constructors
var Truck = {}; // object literal, can't create new instance or pass params
var Car = function(color) {}; // function constructor

var bmw = new Car('red');
var lexus = new Car('blue');

// inheritance
var Employee = function(options) {
    this.name = options.name;
    this.age = options.age;
};

// better performance than this.greeting because it's only created once and then inherited
// the keyword this is more controlled
Employee.prototype.greeting = function() {
    return 'Hello';
};

var Developer = function(options) {
    Employee.call(this, options);

    this.language = options.language;
}

Developer.prototype = Object.create(Employee.prototype);
Developer.prototype.constructor = Developer;

var Designer = function(options) {
    Employee.call(this, options);

    this.tool = options.tool;
}

Designer.prototype.greeting = function() {
    return 'Hello I\'m a designer';
};

var developer = new Developer({
    name: 'Joe',
    age: 20,
    language: 'JavaScript'
});

var designer = new Designer({
    name: 'Abby',
    age: 24,
    tool: 'Photoshop'
});

console.log(developer);
console.log(developer instanceof Developer);
console.log(developer instanceof Employee);
console.log(developer.greeting());

console.log(designer);
console.log(designer.greeting());

// this keyword

// outside of a function this refers to the global object
// console.log(this); // window if we are in a browser

// functions
// In strict mode, the value of this remains at whatever it's set to when entering the execution context. If it's not defined, it remains undefined. It can also be set to any value, such as null or 42 or "I am not this".

// When a function is called as a method of an object, its this is set to the object the method is called on
var Car = {
    color: 'red',

    getColor: function() {
        return this.color;
    }
}

console.log(Car.getColor());

// Where a function uses the this keyword in its body, its value can be bound to a particular object in the call using the call or apply

function add(c, d){
    return this.a + this.b + c + d;
}

var o = {a:1, b:3};

add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16

// When a function is used as an event handler, its this is set to the element the event fired from 

// Immediately-Invoked Function Expression (IIFE)
(function() {
    // private
    var color = 'red';
    
    return {
        color: 'blue'; // public
    }
}());