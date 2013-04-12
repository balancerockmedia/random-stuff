define([], function() {
  
  var job_row = Backbone.View.extend({
    tagName: 'tr',
  
    events: {
      'click .details': 'clickDetails'
    },
  
    initialize: function() {
      this.render();
    },
  
    render: function() {
      var job_row_template = Handlebars.compile($("#job_row_template").html());
      this.$el.html(job_row_template(this.model.toJSON()));
    
      return this;
    },
  
    clickDetails: function(e) {
      e.preventDefault();
    
      var id = $(e.target).attr('data-id');
    
      CDIAJobBoard.router.navigate('job/' + id, {trigger: true});
    }
  });
  
  return job_row;
  
});