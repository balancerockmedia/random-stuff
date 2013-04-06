var CDIAJobBoard = {
  config: {
    api_url: 'http://127.0.0.1/~Dan/random_stuff/cdia_job_board/api/index.php/' 
  },
  collections: {},
  events: {}
}

// events bus
_.extend(CDIAJobBoard.events, Backbone.Events)

// require.js config
require.config({
  urlArgs: 't=' + (new Date()).getTime()
});

// initialize app
require(['app'], function(app) {
  app.initialize();
});