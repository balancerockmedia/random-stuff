define([], function() {
  
  var sidebar = Backbone.View.extend({
    el: '#sidebar',
  
    initialize: function() {
      this.collection = CDIAJobBoard.collections.favorites;
      this.listenTo(this.collection, 'all', this.populateFavorites);
      
      this.render();
    },
  
    render: function() {
      var sidebar_template = Handlebars.compile($("#sidebar_template").html());
      this.$el.html(sidebar_template());
    
      return this;
    },
    
    populateFavorites: function() {
      var context = this;
      
      this.$('ul').empty();
      
      _.forEach(this.collection.models, function(model) {
        var list_item = '<li><a href="#job/'+model.get('id')+'">'+model.get('title')+'</a></li>';
        
        context.$('ul').append(list_item);
      });
    }
  });
  
  return sidebar;
  
});