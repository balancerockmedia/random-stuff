define([], function() {
  
  var job_details = Backbone.View.extend({
    tagName: 'div',
    id: 'job_details_modal',
    className: 'modal hide fade',
    
    events: {
      'click .add_to_favorites': 'clickAddToFavorites'
    },
  
    initialize: function() {
      var context = this;
      
      if (this.model === undefined) {
        CDIAJobBoard.router.navigate('', {trigger: true});
      } else {
        this.model.fetch({
          success: function(model, response, options) {
            context.render();
          }
        });
      }
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
    },
    
    // events
    clickAddToFavorites: function(e) {
      e.preventDefault();
      
      CDIAJobBoard.collections.favorites.add(this.model);
    }
  });
  
  return job_details;
  
});