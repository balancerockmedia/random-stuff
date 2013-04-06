// require.js config
require.config({
    urlArgs: 't=' + (new Date()).getTime()
});

// initialize app
require(['app'], function(app) {
  
  app.initialize();
  
});