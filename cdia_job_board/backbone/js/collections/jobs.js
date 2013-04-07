define(['models/job'], function(Job) {
  
  var jobs = Backbone.Collection.extend({
    model: Job,
    url: CDIAJobBoard.config.api_url + 'jobs',
    
    search: function(category) {
      this.fetch({
        data: {
          search: CDIAJobBoard.search_fields
        }
      });
    }
  });
  
  return jobs;
  
});