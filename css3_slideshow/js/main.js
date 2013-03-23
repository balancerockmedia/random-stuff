var slideshow = function() {
	$('#hero_nav').show();
	
	$('.hero').hide();
	$('.hero:first').show();
	
	$('#hero_nav a').on('click', function(e) {
		e.preventDefault();
		
		clearInterval(sequence);
		
		var id = $(e.target).attr('href');
		
		$('.hero').fadeOut();
		$(id).fadeIn();
	});
	
	var current = 0;
	
	var sequence = setInterval(function() {
		if (current === $('.hero').length - 1) {
			current = 0;
		} else {
			current++;
		}
		
		$('.hero:visible').fadeOut();
		$('.hero').eq(current).fadeIn();
	}, 4000);
}


$(function() {
	if (!$('html').hasClass('cssanimations')) {
		slideshow();
	}
});