require.config({
    baseUrl: 'js/modules',
    paths: {},
    urlArgs: 't=' + (new Date()).getTime()
});

require(['templates', 'favorites'], function(templates, favorites) {

    var api_url = '../api/index.php/';

    var init = function() {
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