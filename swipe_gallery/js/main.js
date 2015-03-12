$(window).load(function() {
    var position = 0;
    var img_width = $('.gallery img:first').width();
    
    $('#leftButton').on('click', function() {
    //$('.gallery').on('swipeleft', function() {
        if ($('.gallery').is(':animated')) {
            return false;
        }
        
        if (position > -2) {
            position -= 1;
            
            $('.gallery').animate({
                'margin-left': '-='+img_width+'px'
            });
        }
    });
    
    $('#rightButton').on('click', function() {
    //$('.gallery').on('swiperight', function() {
        if ($('.gallery').is(':animated')) {
            return false;
        }
        
        if (position < 0) {
            position += 1;
            
            $('.gallery').animate({
                'margin-left': '+='+img_width+'px'
            });
        }
    });
});