define(
  ['views/search_form', 'views/job_row', 'views/sidebar'],
  function(SearchFormView, JobRowView, SidebarView) {
  
  var content = Backbone.View.extend({
    tagName: 'div',
    className: 'container-fluid',
  
    initialize: function() {
      this.listenTo(this.collection, 'all', this.populateJobs);
    
      this.collection.fetch();
    },
  
    render: function() {
      var content_template = Handlebars.compile($("#content_template").html());
      this.$el.html(content_template());
    
      // add search form
      var search_form_view = new SearchFormView({
        el: this.$('#search_bar')
      });
    
      this.populateJobs();
      
      // add sidebar
      var sidebar_view = new SidebarView({
        el: this.$('#sidebar')
      });
    
      return this;
    },
    
    populateJobs: function() {
      var context = this;
      
      this.$('tbody').empty();
      
      _.forEach(this.collection.models, function(model) {
        var job_row_view = new JobRowView({
          model: model
        });
      
        context.$('tbody').append(job_row_view.el);
      });
    }
  });
  
  return content;
  
});