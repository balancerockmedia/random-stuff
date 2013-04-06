define(['views/search_form', 'views/job_row'], function(SearchFormView, JobRowView) {
  
  var content = Backbone.View.extend({
    tagName: 'div',
    className: 'container-fluid',
  
    initialize: function() {
      this.listenTo(this.collection, 'all', this.render);
    
      this.collection.fetch();
    },
  
    render: function() {
      var navbar_template = Handlebars.compile($("#content_template").html());
      this.$el.html(navbar_template());
    
      // add search form
      var search_form_view = new SearchFormView({
        el: this.$el.find('#search_bar')
      });
    
      var that = this;
    
      // add jobs to table
      _.forEach(this.collection.models, function(model) {
        var search_form_view = new JobRowView({
          model: model
        });
      
        that.$('tbody').append(search_form_view.el)
      });
    
      return this;
    }
  });
  
  return content;
  
});