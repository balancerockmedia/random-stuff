define(['models/job'], function(Job) {
  
  var jobs = Backbone.Collection.extend({
    model: Job,
    url: CDIAJobBoard.config.api_url + 'jobs'
  });
  
  return jobs;
  
});