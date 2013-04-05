$(function() {
  var api_url = '../api/index.php/';
  
  // model
  var Job = Backbone.Model.extend();
  
  // collection
  var Jobs = Backbone.Collection.extend({
    model: Job,
    url: api_url + 'jobs'
  });
  
  var jobs = new Jobs();
  jobs.fetch();
  
  // router
  var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'home': 'home',
      'about': 'about'
    }
  });
  
  var router = new Router();
  
  router.on('route:home', function(page) {
    console.log('home');
  });
  
  router.on('route:about', function(page) {
    console.log('about');
  });
  
  // start backbone history
  Backbone.history.start();
});