define(
  ['router', 'views/navbar', 'views/content', 'collections/jobs'],
  function(Router, NavbarView, ContentView, Jobs) {
  
  var initialize = function() {
    // get jobs
    CDIAJobBoard.collections.jobs = new Jobs();
    
    // create nav bar
    var navbar_view = new NavbarView();
    $('body').append(navbar_view.render().el);
  
    // create content view with jobs collection
    var content_view = new ContentView({
      collection: CDIAJobBoard.collections.jobs
    });
    $('body').append(content_view.render().el);
    
    // create router
    CDIAJobBoard.router = new Router();
  }
  
  return {
    initialize: initialize
  }
  
});