String.prototype.reverse = function() {
    var chars = this.split(''),
        new_string = '';
    
    for (var i = chars.length - 1; i >= 0; i--) {
        new_string += chars[i];
    }
    
    return new_string;
};

console.log("Cat".reverse());