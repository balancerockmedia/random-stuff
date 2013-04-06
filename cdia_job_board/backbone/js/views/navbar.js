define([], function() {
  
  var navbar = Backbone.View.extend({
    tagName: 'div',
    className: 'navbar navbar-inverse navbar-fixed-top',
  
    initialize: function() {
      this.render();
    },
  
    render: function() {
      var navbar_template = Handlebars.compile($("#navbar_template").html());
      this.$el.html(navbar_template());
    
      return this;
    }
  });
  
  return navbar;
  
});