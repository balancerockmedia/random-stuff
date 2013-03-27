$(window).load(function() {
    var position = 0;
    var img_width = $('.gallery img:first').width();
    
    $('.gallery').on('swipeleft', function() {
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
    
    $('.gallery').on('swiperight', function() {
        if ($('.gallery').is(':animated')) {
            return false;
        }
        
        if (position < 0) {
            $('.gallery').animate({
                'margin-left': '+='+img_width+'px'
            });
            
            position += 1;
        }
    });
});