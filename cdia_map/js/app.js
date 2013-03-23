var cdia_map = {
    api_url: 'api/index.php/',
    map: null,
    markers: [],
    
    init: function() {
        var center, defer = $.Deferred();
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                defer.resolve();
            }, function(error) {
                center = new google.maps.LatLng(42.3764, -71.2361);
                defer.resolve();
            });
        } else {
            center = new google.maps.LatLng(42.3764, -71.2361);
            defer.resolve();
        }
        
        defer.done(function() {
            var mapOptions = {
                center: center,
                zoom: 9,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
    
            cdia_map.map = new google.maps.Map($('#map_canvas').get(0), mapOptions);
        
            cdia_map.place_pins();
        });
    },
    
    place_pins: function() {
    $.getJSON(cdia_map.api_url + 'users', function(data) {
            $.each(data, function() {
                var user = this;
                
                var latlng = new google.maps.LatLng(user.latitude, user.longitude);
                
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: cdia_map.map,
                    title: user.first_name + ' ' + user.last_name,
                    program_name: user.program_name,
                    status_name: user.status_name
                });
                
                cdia_map.markers.push(marker);
                
                var infowindow = new google.maps.InfoWindow({
                    content: 'loading...'
                });
                
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(cdia_map.map, marker);
                    cdia_map.load_infowindow(infowindow, user);
                });
            });
        });
        
        cdia_map.filters();
    },
    
    load_infowindow: function(infowindow, user) {
        $.getJSON(cdia_map.api_url + 'user/' + user.id, function(data) {
            var user = data;
            
            var html_content = '<h4>' + user.first_name + ' ' + user.last_name + '</h4>';
            html_content += '<p>' + user.status_name + ' in ' + user.program_name + '<br />';
            html_content += user.city + ', ' + user.state + '<br />' + user.country + '</p>';
            
            infowindow.setContent(html_content);
        });
    },
    
    filters: function() {
        $('select[name="program"]').on('change', function(e) {
            $.each(cdia_map.markers, function() {
                if ($(e.target).val() === '') {
                    this.setVisible(true);
                } else if (this.program_name === $(e.target).find('option:selected').text()) {
                    this.setVisible(true);
                } else {
                    this.setVisible(false);
                }
            });
        });
        
        $('select[name="status"]').on('change', function(e) {
            $.each(cdia_map.markers, function() {
                if ($(e.target).val() === '') {
                    this.setVisible(true);
                } else if (this.status_name === $(e.target).find('option:selected').text()) {
                    this.setVisible(true);
                } else {
                    this.setVisible(false);
                }
            });
        });
        
        $('#reset').on('click', function(e) {
            e.preventDefault();
            
            $('select[name="program"], select[name="status"]').val(0);
            
            $.each(cdia_map.markers, function() {
                this.setVisible(true);
            });
        });
    },
    
    admin: function() {
        var update_users = function(users) {
            var rows = '';
                
            if (users.length > 0) {
                $.each(users, function() {
                    rows += '<tr><td>'+this.first_name+' ' +this.last_name+'</td><td>'+this.program_name+'</td><td>'+this.status_name+'</td><td><a href="#" class="btn btn-mini edit" data-id="'+this.id+'">Edit</a></td><td><a href="#" class="btn btn-mini btn-danger remove" data-id="'+this.id+'">Remove</a></td></tr>';
                });
            } else {
                rows += '<tr><td colspan="5">No Results</td></tr>';
            }
                
            $('#user_table tbody').html(rows);
        }
        
        $('#admin_link').on('click', function(e) {
            e.preventDefault();
            
            $.get(cdia_map.api_url + 'users', {user: 'all'}, function(data) {
                update_users(data);
            });
            
            $('#admin_modal').modal();
        });
        
        $('#add_user_link').on('click', function(e) {
            e.preventDefault();
            
            if ($(e.target).text() === 'Save') {
                var form_fields = $('#add_user form').serialize();
                
                $.post(cdia_map.api_url + 'upsert', form_fields, function(data) {
                    $('#go_back_link, #add_user').hide();
                    $('#edit_delete_users').show();
                    $('#add_user_link').text('Add User');
            
                    $('#add_user input[type="text"], #add_user input[type="hidden"]').val('');
                    
                    update_users(data);
                });
            } else {
                $('#edit_delete_users').hide();
                $('#go_back_link').css('display', 'inline-block');
                $('#add_user').show();
                $(e.target).text('Save');
            }
        });
        
        $('#go_back_link').on('click', function(e) {
            e.preventDefault();
            
            $('#go_back_link, #add_user').hide();
            $('#edit_delete_users').show();
            $('#add_user_link').text('Add User');
            
            $('#add_user input[type="text"], #add_user input[type="hidden"]').val('');
        });
        
        $('#search_form').on('submit', function(e) {
            e.preventDefault();
            
            var form_fields = $(this).serialize();
            
            $.post(cdia_map.api_url + 'search', form_fields, function(data) {
                update_users(data);
            });
        });
        
        $('#user_table').on('click', '.edit', function(e) {
            e.preventDefault();
            
            var id = $(e.target).attr('data-id');
            
            $.getJSON(cdia_map.api_url + 'user/' + id, function(data) {
                $.each(data, function(key, value) {
                    $('#add_user input[name="'+key+'"]').val(value);
                });
                
                $('#edit_delete_users').hide();
                $('#go_back_link').css('display', 'inline-block');
                $('#add_user').show();
                $('#add_user_link').text('Save');
            });
        });
        
        $('#user_table').on('click', '.remove', function(e) {
            e.preventDefault();
            
            if (confirm('Are you sure?')) {
                var id = $(e.target).attr('data-id');
            
                $.get(cdia_map.api_url + 'remove/' + id, function(data) {
                    update_users(data);
                });
            }
        });
    }
};

$(function() {
    cdia_map.init();
    cdia_map.admin();
});