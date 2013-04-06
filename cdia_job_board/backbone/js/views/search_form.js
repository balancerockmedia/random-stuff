define([], function() {
  
  var search_form = Backbone.View.extend({
    el: '#search_bar',
  
    initialize: function() {
      this.render();
    },
  
    render: function() {
      var search_form_template = Handlebars.compile($("#search_form_template").html());
      this.$el.html(search_form_template());
    
      return this;
    }
  });
  
  return search_form;
  
});