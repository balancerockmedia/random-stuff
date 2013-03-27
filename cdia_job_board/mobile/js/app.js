require.config({
    baseUrl: 'js/modules',
    paths: {},
    urlArgs: 't=' + (new Date()).getTime()
});

require(['templates', 'favorites'], function(templates, favorites) {

    var api_url = 'http://173.203.102.128/cdia_job_board/api/index.php/';

    var init = function() {
        // fix the refresh problem when not on homepage
        // if (window.location.hash !== '')
        if ($.mobile.activePage === undefined) {
            $.mobile.changePage("#home_page", {transition: "none"});
        }
        
        $.getJSON(api_url + 'jobs?callback=?', function(data) {             
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
            
            $.getJSON(api_url + 'job/' + id + '?callback=?', function(data) {
                $('#job_details').html(_.template(templates.job_details, data)).trigger('create');
                               
                $.mobile.loading('hide');
            
                $.mobile.changePage("#job_detail_page", {transition: "flip"});
            });
        });
    }

    $(function() {
        init();
        favorites.init();
    });

});