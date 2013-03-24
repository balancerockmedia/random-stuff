define(['jquery', 'lodash', 'templates', 'jquery.mobile'], function($, _, templates) {
    
    var api_url = '../api/index.php/';
    var favorites = [];
    
    var init = function() {
        try {
            favorites = JSON.parse(localStorage.getItem('jb.favorites')) || [];
        } catch(error) {
            console.log('Error using localStorage: ' + error);
        }
    
        $('#job_detail_page').on('click', '.add_favorite', function(e) {
            e.preventDefault();
    
            var id = $(e.currentTarget).attr('data-id');
            var title = $(e.currentTarget).attr('data-title');
            
            if (_.find(favorites, { id: id}) !== undefined) {
                return;
            }
    
            favorites.push({
                id: id,
                title: title
            });
    
            try {
                localStorage.setItem('jb.favorites', JSON.stringify(favorites));
            } catch(error) {
                console.log('Error using localStorage: ' + error);
            }
        });
      
        $('.favorites').on('panelbeforeopen', function(e, ui) {        
            var html = '';
    
            _.forEach(favorites, function(favorite) {
                html += _.template(templates.favorite, {id: favorite.id, title: favorite.title});
            });
    
            $('.favorites_list').html(html).trigger('create');
        });
        
        $('.favorites').on('click', 'a', function(e) {
            e.preventDefault();
        
            $.mobile.loading('show');
        
            var id = $(e.currentTarget).attr('data-id');
        
            $.getJSON(api_url + 'job/' + id, function(data) {
                $('#job_details').html(_.template(templates.job_details, data)).trigger('create');
            
                if ($.mobile.activePage.attr('id') === 'job_detail_page') {
                    $(e.target).parents('.favorites').panel('close');
                }
            
                $.mobile.loading('hide');
            
                $.mobile.changePage("#job_detail_page", {transition: "flip"});
            });
        });
    };

    return {
        init: init
    };
});