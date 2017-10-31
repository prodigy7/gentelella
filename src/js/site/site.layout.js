// TODO: This is some kind of easy fix, maybe we can improve this
var setContentHeight = function () {

	// reset height
	$.rightCol.css('min-height', $(window).height());

	var bodyHeight = $.body.outerHeight(),
		footerHeight = $.body.hasClass('footer_fixed') ? -10 : $.footer.height(),
		leftColHeight = $.leftCol.eq(1).height() + $.sidebarFooter.height(),
		contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

	// normalize content
	contentHeight -= $.navMenu.height() + footerHeight;

	$.rightCol.css('min-height', contentHeight);

	return(true);
};


// recompute content when resizing
$(window).smartresize(function(){
	setContentHeight();
});
