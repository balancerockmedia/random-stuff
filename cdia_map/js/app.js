var cdia_map = {
    init: function() {
        var mapOptions = {
            center: new google.maps.LatLng(42.35892, -71.05781),
            zoom: 9,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    
        var map = new google.maps.Map($('#map_canvas').get(0), mapOptions);
    }
};

$(function() {
    cdia_map.init();
});