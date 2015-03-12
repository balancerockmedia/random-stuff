var MathHelpers = {
    add: function(num1, num2) {
        return num1 + num2;
    },
    
    myFunction: function(numbers) {
        var sum = 0;
    
        for (var i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 === 0) {
                sum += numbers[i];
            }
        }
    
        return sum;
    }
}

exports.MathHelpers = MathHelpers;