define(['models/job'], function(Job) {
  
  var jobs = Backbone.Collection.extend({
    model: Job,
    url: CDIAJobBoard.config.api_url + 'jobs',
    
    filterByCategory: function(category) {
      this.fetch({
        data: {
          search: {
            category: category
          }
        }
      });
    }
  });
  
  return jobs;
  
});