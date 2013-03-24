define({
    job_row: '<li><a href="#" data-id="<%= job_id %>">\
    <h2><%= title %></h2><p><strong>Science Exchange</strong> - <%= location_name %></p>\
    <p><%= tagline %></p><p class="ui-li-aside"><strong><%= type %></strong></p></a></li>',

    job_details: '<h2><%= title %></h2><p><%= description %></p><p>\
    <p><a href="#" data-role="button">Apply</a></p>\
    <p><a href="#" class="add_favorite" data-id="<%= job_id %>" data-title="<%= title %>"\
    data-role="button">Add to Favorites</a></p>',

    favorite: '<p><a href="#" data-role="button" data-inline="true"\
    data-id="<%= id %>"><%= title %></a></p>'
});