define(
  ['router', 'views/navbar', 'views/content', 'collections/jobs'],
  function(Router, NavbarView, ContentView, Jobs) {
  
  var initialize = function() {
    // create router
    cdia_job_board.router = new Router();
  
    // create nav bar
    var navbar_view = new NavbarView();
    $('body').append(navbar_view.render().el);
  
    // get jobs
    var jobs = new Jobs();
  
    // create content view with jobs collection
    var content_view = new ContentView({
      collection: jobs
    });
    $('body').append(content_view.render().el);
  }
  
  return {
    initialize: initialize
  }
  
});