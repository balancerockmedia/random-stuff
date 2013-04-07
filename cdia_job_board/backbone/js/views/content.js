define(['views/search_form', 'views/job_row'], function(SearchFormView, JobRowView) {
  
  var content = Backbone.View.extend({
    tagName: 'div',
    className: 'container-fluid',
  
    initialize: function() {
      this.listenTo(this.collection, 'all', this.populateJobs);
    
      this.collection.fetch();
    },
  
    render: function() {
      var navbar_template = Handlebars.compile($("#content_template").html());
      this.$el.html(navbar_template());
    
      // add search form
      var search_form_view = new SearchFormView({
        el: this.$('#search_bar')
      });
    
      this.populateJobs();
    
      return this;
    },
    
    populateJobs: function() {
      var context = this;
      
      context.$('tbody').empty();
      
      _.forEach(this.collection.models, function(model) {
        var search_form_view = new JobRowView({
          model: model
        });
      
        context.$('tbody').append(search_form_view.el)
      });
    }
  });
  
  return content;
  
});