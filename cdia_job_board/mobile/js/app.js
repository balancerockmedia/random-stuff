require.config({
    baseUrl: "js/modules",
    paths: {
        'jquery': 'http://code.jquery.com/jquery-1.9.1.min',
        'jquery.mobile': 'http://code.jquery.com/mobile/1.3.0/jquery.mobile-1.3.0.min',
        'lodash': '../libs/lodash.min'
    }
});

require(['jquery', 'lodash', 'templates', 'jquery.mobile'], function($, _, templates) {
    
    var jb = {};

    jb.api_url = '../api/index.php/';
    jb.favorites = [];

    jb.init = function() {
        // fix the refresh problem when not on homepage
        if ($.mobile.activePage === undefined) {
            $.mobile.changePage("#home_page", {transition: "none"});
        }
    
        try {
            jb.favorites = JSON.parse(localStorage.getItem('jb.favorites')) || [];
        } catch(error) {
            console.log('Error using localStorage: ' + error);
        }
    
        $.getJSON(jb.api_url + 'jobs', function(data) {                    
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
        
            $.getJSON(jb.api_url + 'job/' + id, function(data) {
                $('#job_details').html(_.template(templates.job_details, data)).trigger('create');
                               
                $.mobile.loading('hide');
            
                $.mobile.changePage("#job_detail_page", {transition: "flip"});
            });
        });
    
        $('.favorites').on('click', 'a', function(e) {
            e.preventDefault();
        
            $.mobile.loading('show');
        
            var id = $(e.currentTarget).attr('data-id');
        
            $.getJSON(jb.api_url + 'job/' + id, function(data) {
                $('#job_details').html(_.template(templates.job_details, data)).trigger('create');
            
                if ($.mobile.activePage.attr('id') === 'job_detail_page') {
                    $(e.target).parents('.favorites').panel('close');
                }
            
                $.mobile.loading('hide');
            
                $.mobile.changePage("#job_detail_page", {transition: "flip"});
            });
        });
    
        $('#job_detail_page').on('click', '.add_favorite', function(e) {
            e.preventDefault();
        
            var id = $(e.currentTarget).attr('data-id');
            var title = $(e.currentTarget).attr('data-title');
        
            jb.favorites.push({
                id: id,
                title: title
            });
        
            try {
                localStorage.setItem('jb.favorites', JSON.stringify(jb.favorites));
            } catch(error) {
                console.log('Error using localStorage: ' + error);
            }
        });
    
        $('.favorites').on('panelbeforeopen', function(e, ui) {        
            var html = '';
        
            _.forEach(jb.favorites, function(favorite) {
                html += _.template(jb.favorite_template, {id: favorite.id, title: favorite.title});
            });
        
            $('.favorites_list').html(html).trigger('create');
        });
    };

    $(function() {
        jb.init();
    });
    
});