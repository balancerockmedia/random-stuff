var cdia_map = {
    api_url: 'api/index.php/',
    map: null,
    markers: [],
    
    init: function() {
        var mapOptions = {
            center: new google.maps.LatLng(42.35892, -71.05781),
            zoom: 9,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    
        cdia_map.map = new google.maps.Map($('#map_canvas').get(0), mapOptions);
        
        cdia_map.place_pins();
    },
    
    place_pins: function() {
		$.getJSON(cdia_map.api_url + 'students', function(data) {                    
            $.each(data, function() {
                var latlng = new google.maps.LatLng(this.latitude, this.longitude);
                
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: cdia_map.map,
                    title: this.first_name + ' ' + this.last_name,
                    program_name: this.program_name,
                    status_name: this.status_name
                });
                
                cdia_map.markers.push(marker);
                
                var html_content = '<h4>' + this.status_name + ' in ' + this.program_name + '</h4>';
                html_content += '<p>' + this.first_name + ' ' + this.last_name + '</p>';
                
                var infowindow = new google.maps.InfoWindow({
                    content: html_content
                });
                
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(cdia_map.map, marker);
                });
            });
        });
        
        cdia_map.filters();
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
    }
};

$(function() {
    cdia_map.init();
});