// toggle small or large menu
$.menuToggle.on('click', function() {
	if ($.body.hasClass('nav-md')) {
		$.sidebarMenu.find('li.active ul').hide();
		$.sidebarMenu.find('li.active').addClass('active-sm').removeClass('active');
	} else {
		$.sidebarMenu.find('li.active-sm ul').show();
		$.sidebarMenu.find('li.active-sm').addClass('active').removeClass('active-sm');
	}

	$.body.toggleClass('nav-md nav-sm');

	setContentHeight();

	$('.dataTable').each ( function () { $(this).dataTable().fnDraw(); });
});
