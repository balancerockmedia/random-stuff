define(['models/job'], function(Job) {
  
  var favorites = Backbone.Collection.extend({
    model: Job
  });
  
  return favorites;
  
});