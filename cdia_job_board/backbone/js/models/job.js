define([], function() {
  
  var job = Backbone.Model.extend({
    urlRoot: CDIAJobBoard.config.api_url + 'job'
  });
  
  return job;
  
});