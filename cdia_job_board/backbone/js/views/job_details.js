define([], function() {
  
  var job_details = Backbone.View.extend({
    tagName: 'div',
    id: 'job_details_modal',
    className: 'modal hide fade',
  
    initialize: function() {
      var context = this;
      
      this.model.fetch({
        success: function(model, response, options) {
          context.render();
        }
      });
    },
  
    render: function() {
      var context = this;
      
      var job_details_template = Handlebars.compile($("#job_details_template").html());
      this.$el.html(job_details_template(this.model.toJSON()));
      
      $('body').append(this.el);
      
      this.$el.bind('hidden', function() {
        CDIAJobBoard.router.navigate('', {trigger: true});
    
        context.$el.remove();
      });
      
      this.$el.modal();
      
      return this;
    }
  });
  
  return job_details;
  
});