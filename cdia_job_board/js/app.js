var jb = {};

jb.api_url = 'api/index.php/';
jb.google_api_url = 'http://maps.googleapis.com/maps/api/';

jb.search = {
    search_data: {
        keyword: null,
        location: null,
        category: null
    },
    
    init: function() {
        // load search data from localstorage
        try {
            var local_search_data = localStorage.getItem('jb.search.search_data');
            
            if (local_search_data !== null) {
                jb.search.search_data = JSON.parse(local_search_data);
                jb.search.update_search_terms();
            }
        } catch(error) {
            console.log('Error using localstorage: ' + error)
        }
        
        // set up search fields
        jb.search.keyword_field();
        jb.search.location_field();
        jb.search.category_field();
        jb.search.reset_button();
        
        jb.search.update_search_terms();
        
        // load modal with description
        $('table').on('click', 'a.details', function(e) {
            e.preventDefault();
            
            var id = $(e.target).attr('data-id');
            
    		$.getJSON(jb.api_url + 'job/' + id, function(data) {                    
                $('#job_details h3').text(data.title);
                $('#job_details .modal-body').text(data.description);
                
                $('#job_details').modal();
    		});
        });
    },
    
    keyword_field: function() {
        $('#keyword').typeahead({
            source: ['CSS', 'HTML', 'Photoshop', 'PHP', 'Mobile', 'Responsive Design'],
        
            updater: function(item) {
                jb.search.search_data.keyword = item;
                jb.search.update_search_terms();
            
                return item;
            }
        });
        
        $('#keyword').on('keyup', function(e) {
            if ($(e.target).val() === '') {
                jb.search.search_data.keyword = null;
            } else {
                jb.search.search_data.keyword = $(e.target).val();
            }
                
            jb.search.update_search_terms();
        });
    },
    
    location_field: function() {
        $('#location').typeahead({
            source: function(query, process) {
                $.getJSON(jb.api_url + 'states?callback=?', function (data) {
                    var states = [];
                
                    $.each($.parseJSON(data), function() {
                       states.push(this.name); 
                    });
                
                    return process(states);
                });
            },
        
            updater: function(item) {
                jb.search.search_data.location = item;
                jb.search.update_search_terms();
            
                return item;
            }
        });
    
        $('#location').on('keyup', function(e) {
            if ($(e.target).val() === '') {
                jb.search.search_data.location = null;
            } else {
                jb.search.search_data.location = $(e.target).val();
            }
                
            jb.search.update_search_terms();
        });
    },
    
    category_field: function() {
        $('#category').on('change', function(e) {
            if ($(e.target).val() === '') {
                jb.search.search_data.category = null;
            } else {
                jb.search.search_data.category = $(e.target).val();
            }
        
            jb.search.update_search_terms();
        });
    },
    
    reset_button: function() {
        $('#reset').on('click', function(e) {
            e.preventDefault();
            
            jb.search.search_data = {
                keyword: null,
                location: null,
                category: null
            };
        
            jb.search.update_search_terms();
        });
    },
    
    update_search_terms: function() {
        $('#reset').removeClass('disabled');
        
        // set initial text
        var html = 'Showing all jobs';
        
        // if there is a category, change initial text to contain the category
        if (jb.search.search_data.category !== null) {
            html = 'Showing '+jb.search.search_data.category+' jobs';
        }
        
        // if there is a keyword, append it to initial text
        if (jb.search.search_data.keyword !== null) {
            html += ' matching <span class="label label-important">'+jb.search.search_data.keyword+'</span>';
        }
        
        // if there is a location, append it to initial text
        if (jb.search.search_data.location !== null) {
            html += ' in <span class="label label-important">'+jb.search.search_data.location+'</span>';
        }
        
        // if there is nothing, clear the search bar
        if (jb.search.search_data.keyword === null && jb.search.search_data.location === null && jb.search.search_data.category === null) {
            // empty initial text
            html = '';
            
            // reset search fields
            $('#location, #keyword, #category').val('');
            $('#location').attr('placeholder', 'Location');
            
            // disable reset button
            $('#reset').addClass('disabled');
        }
        
        // update search terms text
        $('#current_search_terms').html(html);
        
        // store search data in localstorage
        try {
            localStorage.setItem('jb.search.search_data', JSON.stringify(jb.search.search_data));
        } catch(error) {
            console.log('Error using localstorage: ' + error);
        }
        
		// load and populate jobs
		$.getJSON(jb.api_url + 'jobs', {search: jb.search.search_data}, function(data) {                    
            $('table tbody').empty();
                    
            var new_html = ''
                    
            $.each(data, function() {
                new_html += '<tr>';
                        
				new_html +=  '<td>'+this.location_name+'</td>';
                new_html +=  '<td>'+this.title+'</td>';
                new_html +=  '<td>'+this.category_name+'</td>';
                
                var keywords = (this.keyword_list === null) ? '' : this.keyword_list;
                
                new_html +=  '<td>'+keywords+'</td>';
                new_html +=  '<td><a class="btn btn-primary details" href="#" data-id="'+this.job_id+'">Details</a></td>';
                        
                new_html += '</tr>';
            });
                    
            $('table tbody').html(new_html);
		});
    }
}

jb.geolocation = {
    init: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(jb.geolocation.success, jb.geolocation.error);
        } else {
            error('not supported');
        }
    },
    
    success: function(position) {
        $.getJSON(jb.google_api_url + 'geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=false', function(data) {
            
            // alert(position.coords.accuracy);
            
            $('#location').attr('placeholder', data.results[0].address_components[4].long_name);
            // jb.search.search_data.location = data.results[0].address_components[4].long_name;
            // jb.search.update_search_terms();
        });
    },
    
    error: function(msg) {
        console.log('Geolocation error: ' + error);
    }
}

$(function() {
    // jb.geolocation.init();
    jb.search.init();
});