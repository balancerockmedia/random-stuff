define([], function() {
  
  var search_form = Backbone.View.extend({
    events: {
      'change select[name="category"]': 'changeCategory',
      'click #reset': 'clickReset'
    },
    
    initialize: function() {
      this.render();
    },
    
    render: function() {
      var search_form_template = Handlebars.compile($("#search_form_template").html());
      this.$el.html(search_form_template());
    
      return this;
    },
    
    changeCategory: function(e) {
      e.preventDefault();
      
      CDIAJobBoard.collections.jobs.filterByCategory($(e.target).val());
    },
    
    clickReset: function(e) {
      e.preventDefault();
      
      CDIAJobBoard.collections.jobs.fetch();
    }
  });
  
  return search_form;
  
});