define(['views/search_form', 'views/job_row'], function(SearchFormView, JobRowView) {
  
  var content = Backbone.View.extend({
    tagName: 'div',
    className: 'container-fluid',
  
    initialize: function() {
      this.listenTo(this.collection, 'all', this.render);
    
      this.collection.fetch();
    },
  
    render: function() {
      var context = this;
      
      var navbar_template = Handlebars.compile($("#content_template").html());
      this.$el.html(navbar_template());
    
      // add search form
      var search_form_view = new SearchFormView({
        el: this.$('#search_bar')
      });
    
      // add jobs to table
      _.forEach(this.collection.models, function(model) {
        var search_form_view = new JobRowView({
          model: model
        });
      
        context.$('tbody').append(search_form_view.el)
      });
    
      return this;
    }
  });
  
  return content;
  
});