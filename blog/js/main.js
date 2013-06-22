$(function() {
	$.each($('.post'), function() {
		$('.comment:first', this).before('<p><a href="#" class="comment_link btn">Show Comments</a></p>');
	});
	
	$('.container').on('click', '.comment_link', function() {
		var parent_post = $(this).parents('.post').get(0);
		
		if ($('.comment', parent_post).is(':hidden')) {
			$(this).text('Hide Comments');
			$('.comment', parent_post).fadeIn();
		} else {
			$(this).text('Show Comments');
			$('.comment', parent_post).fadeOut();
		}
		
		return false;
	});
});