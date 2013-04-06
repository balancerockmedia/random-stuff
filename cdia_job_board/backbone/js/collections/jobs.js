define(['config', 'models/job'], function(config, Job) {
  
  var jobs = Backbone.Collection.extend({
    model: Job,
    url: config.api_url + 'jobs'
  });
  
  return jobs;
  
});