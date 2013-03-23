var jb = {};

jb.api_url = '../api/index.php/';

jb.init = function() {
    // fix the refresh problem when not on homepage
    if ($.mobile.activePage === undefined) {
        $.mobile.changePage("#home_page", {transition: "none"});
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
        
        var job_id = $(e.currentTarget).attr('data-id');
        
        $.getJSON(jb.api_url + 'job/' + job_id, function(data) {
            $('#job_details').html(_.template(jb.job_details_template, data));
                               
            $.mobile.loading('hide');
            
            $.mobile.changePage("#job_detail_page", {transition: "flip"});
        });
    });
    
    $('.favorites a').on('click', function(e) {
        e.preventDefault();
        
        $.mobile.loading('show');
        
        var job_id = $(e.currentTarget).attr('data-id');
        
        $.getJSON(jb.api_url + 'job/' + job_id, function(data) {
            $('#job_details').html(_.template(jb.job_details_template, data));
            
            if ($.mobile.activePage.attr('id') === 'job_detail_page') {
                $(e.target).parents('.favorites').panel('close');
            }
            
            $.mobile.loading('hide');
            
            $.mobile.changePage("#job_detail_page", {transition: "flip"});
        });
    });
};

jb.job_row_template = '<li><a href="#" data-id="<%= job_id %>">\
<h2><%= title %></h2><p><strong>Science Exchange</strong> - <%= location_name %></p>\
<p><%= tagline %></p><p class="ui-li-aside"><strong><%= type %></strong></p></a></li>';

jb.job_details_template = '<h2><%= title %></h2><p><%= description %>';

$(function() {
    jb.init();
});