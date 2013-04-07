define([], function() {
  
  var search_form = Backbone.View.extend({
    events: {
      'change select[name="category"]': 'changeCategory',
      'click #reset': 'clickReset'
    },
    
    initialize: function() {
      this.render();
    },
    
    render: function() {
      var search_form_template = Handlebars.compile($("#search_form_template").html());
      this.$el.html(search_form_template());
      
      // keywords
      this.$('input[name="keyword"]').typeahead({
        source: ['CSS', 'HTML', 'Photoshop', 'PHP', 'Mobile', 'Responsive Design'],
    
        updater: function(item) {
          CDIAJobBoard.search_fields.keyword = item;
          CDIAJobBoard.collections.jobs.search();
      
          return item;
        }
      });
      
      // location
      this.$('input[name="location"]').typeahead({
        source: function(query, process) {
          $.getJSON(CDIAJobBoard.config.api_url + 'states?callback=?', function (data) {
            var states = [];
        
            _.forEach($.parseJSON(data), function(state) {
               states.push(state.name); 
            });
        
            return process(states);
          });
        },
    
        updater: function(item) {
          CDIAJobBoard.search_fields.location = item;
          CDIAJobBoard.collections.jobs.search();
      
          return item;
        }
      });
    
      return this;
    },
    
    changeCategory: function(e) {
      e.preventDefault();
      
      CDIAJobBoard.search_fields.category = $(e.target).val();
      CDIAJobBoard.collections.jobs.search();
    },
    
    clickReset: function(e) {
      e.preventDefault();
      
      CDIAJobBoard.search_fields = {
        keyword: null,
        location: null,
        category: null
      };
      
      this.$('input[name="keyword"], input[name="location"]').val('');
      
      CDIAJobBoard.collections.jobs.search();
    }
  });
  
  return search_form;
  
});