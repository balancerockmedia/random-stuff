define({
    job_row: '<li><a href="#" data-id="<%= id %>">\
    <h2><%= title %></h2><p><strong><%= company %></strong> - <%= location_name %></p>\
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><p class="ui-li-aside"><strong><%= type %></strong></p></a></li>',

    job_details: '<h2><%= title %></h2><%= description %>\
    <p><a href="#" class="add_favorite" data-id="<%= id %>" data-title="<%= title %>"\
    data-role="button">Add to Favorites</a></p>',

    favorite: '<p><a href="#" data-role="button" data-inline="true"\
    data-id="<%= id %>"><%= title %></a></p>'
});