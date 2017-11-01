var presentation = new presentationClass();

// Init sidebar
$(document).ready(function() {
    $.getJSON('js/presentation.json', {})
        .done(function(data) {
            presentation.build(data);
        });
});

function presentationClass() {
    this.build = function(data) {
        $.each(data, function(section, items) {
            var presentationEntry = $('<li></li>')

            var presentationAnchor = $('<a href="' + items.link + '"></a>')
            presentationAnchor.append($('<span class="image"><img src="' + items.image + '" alt="Image" /></span>'))
            presentationAnchor.append($('<span>' + items.name + '</span>'))
            presentationAnchor.append($('<span class="time">' + items.timestamp + '</span>'))
            presentationAnchor.append($('<span class="message">' + items.message + '</span>'))
            presentationEntry.append(presentationAnchor);

            $('li[role="presentation"] ul[role="menu"]').append(presentationEntry);
        });

        $('li[role="presentation"] ul[role="menu"]').append($('<li><div class="text-center"><a><strong>See All Alerts</strong> <i class="fa fa-angle-right"></i></a></div></li>'));
        /*$('li[role="presentation"] ul[role="menu"]').find('a[href!="#"]').on('click', function(ev) {
            var link = $(this).attr('href');
            var linkTarget = $(this).attr('target') !== undefined ? $(this).attr('target') : '';
            if (setUpPage(link, linkTarget, ev)) {
                ev.preventDefault();
            }
        });*/

    };

}