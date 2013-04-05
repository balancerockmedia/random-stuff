var jb = {
  config: {
    api_url: 'http://127.0.0.1/~Dan/random_stuff/cdia_job_board/api/index.php/'
  },
  models: {},
  collections: {},
  views: {},
  event_bus: {}
};

// create event bus
_.extend(jb.events, Backbone.Events);

// models
jb.models.Job = Backbone.Model.extend();

// collections
jb.collections.Jobs = Backbone.Collection.extend({
  model: jb.models.Job,
  url: jb.config.api_url + 'jobs'
});

// views
jb.views.NavbarView = Backbone.View.extend({
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

jb.views.SearchFormView = Backbone.View.extend({
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

jb.views.ContentView = Backbone.View.extend({
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
    var search_form_view = new jb.views.SearchFormView({
      el: this.$el.find('#search_bar')
    });
    
    var that = this;
    
    // add jobs to table
    _.forEach(this.collection.models, function(model) {
      var search_form_view = new jb.views.JobRowView({
        model: model
      });
      
      that.$el.find('tbody').append(search_form_view.el)
    });
    
    return this;
  }
});

jb.views.JobRowView = Backbone.View.extend({
  tagName: 'tr',
  
  initialize: function() {
    this.render();
  },
  
  render: function() {
    var job_row_template = Handlebars.compile($("#job_row_template").html());
    this.$el.html(job_row_template(this.model.toJSON()));
    
    return this;
  }
});

jb.init = function() {
  // create nav bar
  var navbar_view = new jb.views.NavbarView();
  $('body').append(navbar_view.render().el);
  
  // get jobs
  var jobs = new jb.collections.Jobs();
  
  // create content view with jobs collection
  var content_view = new jb.views.ContentView({
    collection: jobs
  });
  $('body').append(content_view.render().el);
}

$(function() {
  jb.init();
  
  // start backbone history
  Backbone.history.start();
});