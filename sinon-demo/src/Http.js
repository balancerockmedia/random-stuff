var Http = function() {
  var method, methods, _i, _len;
  
  methods = ['get', 'post', 'put', 'delete'];
  
  for (_i = 0, _len = methods.length; _i < _len; _i++) {
    method = methods[_i];
    this[method] = (function(name) {
      return function() {
        var params;
        params = {
          url: arguments[0],
          type: name.toUpperCase()
        };
        
        return 'test';
        /*if (arguments[1] != null) {
          $.extend(params, arguments[1]);
        }
        return $.ajax(params);*/
      };
    })(method);
  }
}

exports.Http = Http;