require.config({
    baseUrl: "js/modules",
    paths: {
        'jquery': 'http://code.jquery.com/jquery-1.9.1.min',
        'jquery.mobile': 'http://code.jquery.com/mobile/1.3.0/jquery.mobile-1.3.0.min',
        'lodash': '../libs/lodash.min'
    }
});

require(['jquery', 'lodash', 'templates', 'favorites', 'jquery.mobile'], function($, _, templates, favorites) {

    var api_url = '../api/index.php/';

    var init = function() {
        // fix the refresh problem when not on homepage
        if ($.mobile.activePage === undefined) {
            $.mobile.changePage("#home_page", {transition: "none"});
        }
    
        $.getJSON(api_url + 'jobs', function(data) {                    
            $('#job_list').empty();
                
            var new_html = '';
                
            _.forEach(data, function(item) {
                new_html += _.template(templates.job_row, item);
            });
                
            $('#job_list').html(new_html).listview('refresh');
        });
    
        $('#job_list').on('click', 'a', function(e) {
            e.preventDefault();
        
            $.mobile.loading('show');
        
            var id = $(e.currentTarget).attr('data-id');
        
            $.getJSON(api_url + 'job/' + id, function(data) {
                $('#job_details').html(_.template(templates.job_details, data)).trigger('create');
                               
                $.mobile.loading('hide');
            
                $.mobile.changePage("#job_detail_page", {transition: "flip"});
            });
        });
    };

    $(function() {
        init();
        favorites.init();
    });

});