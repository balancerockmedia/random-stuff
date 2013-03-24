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
            new_html += _.template(jb.job_row_template, item);
        });
                
        $('#job_list').html(new_html).listview('refresh');
    });
    
    $('#job_list').on('click', 'a', function(e) {
        e.preventDefault();
        
        $.mobile.loading('show');
        
        var id = $(e.currentTarget).attr('data-id');
        
        $.getJSON(jb.api_url + 'job/' + id, function(data) {
            $('#job_details').html(_.template(jb.job_details_template, data)).trigger('create');
                               
            $.mobile.loading('hide');
            
            $.mobile.changePage("#job_detail_page", {transition: "flip"});
        });
    });
    
    $('.favorites').on('click', 'a', function(e) {
        e.preventDefault();
        
        $.mobile.loading('show');
        
        var id = $(e.currentTarget).attr('data-id');
        
        $.getJSON(jb.api_url + 'job/' + id, function(data) {
            $('#job_details').html(_.template(jb.job_details_template, data)).trigger('create');
            
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

jb.job_row_template = '<li><a href="#" data-id="<%= job_id %>">\
<h2><%= title %></h2><p><strong>Science Exchange</strong> - <%= location_name %></p>\
<p><%= tagline %></p><p class="ui-li-aside"><strong><%= type %></strong></p></a></li>';

jb.job_details_template = '<h2><%= title %></h2><p><%= description %></p><p>\
<p><a href="#" data-role="button">Apply</a></p>\
<p><a href="#" class="add_favorite" data-id="<%= job_id %>" data-title="<%= title %>"\
data-role="button">Add to Favorites</a></p>';

jb.favorite_template = '<p><a href="#" data-role="button" data-inline="true"\
data-id="<%= id %>"><%= title %></a></p>';

$(function() {
    jb.init();
});