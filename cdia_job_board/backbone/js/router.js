define([], function() {
  
  var router = Backbone.Router.extend({
    
    initialize: function() {
      Backbone.history.start();
    },
    
    routes: {
      '': 'index',
      'job/:id': 'job'
    },

    index: function() {
  
    },

    job: function(id) {
    
    }
  });
  
  return router;
  
});