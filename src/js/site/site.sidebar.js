var currentURL = window.location.href.split('#')[0].split('?')[0];

var sidebar = new sidebarClass();

// Init sidebar
$(document).ready(function() {
    $.getJSON('js/sidebar.json', {})
        .done(function(data) {
            sidebar.build(data);
            sidebar.init();
        });
});

function sidebarClass() {
    this.build = function(data) {
        $.each(data, function(section, items) {
            var sectionEntry = $('<div class="menu_section"></div');
            sectionEntry.append($('<h3>' + section + '</h3>'));

            var menuParent = $('<ul class="nav side-menu"></ul>');
            $.each(items, function(index, data) {
                menuParent.append(sidebar.subBuild(data));
            });
            sectionEntry.append(menuParent);

            $('div#sidebar-menu').append(sectionEntry);
        });
    };

    this.subBuild = function(data) {
        var menuEntry = $('<li></li>');
        var menuEntryAnchor = $('<a></a>');

        if (data.page !== undefined) {
            if (data.page == '') {
                menuEntryAnchor.attr('href', '#');
            } else {
                menuEntryAnchor.attr('href', data.page);
            }
        }

        if (data.target !== undefined) {
            if (data.target == '') {
                menuEntryAnchor.attr('target', data.target);
            }
        }

        if (data.icon !== undefined) {
            menuEntryAnchor.append('<i class="fa ' + data.icon + '"></i> ');
        }

        menuEntryAnchor.append(data.name);

        if (data.childs !== undefined) {
            menuEntryAnchor.append('<span class="fa fa-chevron-down"></a>');
        }

        if (data.label !== undefined) {
            if (data.label.type !== undefined && data.label.text !== undefined) {
                menuEntryAnchor.append('<span class="label label-' + data.label.type + ' pull-right">' + data.label.text + '</span>');
            }
        }

        menuEntry.append(menuEntryAnchor);

        if (data.childs !== undefined) {
            var submenuEntry = $('<ul class="nav child_menu"></ul>');
            $.each(data.childs, function(index, subData) {
                submenuEntry.append(sidebar.subBuild(subData));
            });
            menuEntry.append(submenuEntry);
        }

        return (menuEntry);
    }

    this.init = function() {
        $.sidebarMenu.find('a[href!="#"]').on('click', function(ev) {
            var $li = $(this).parent();

            if ($li.is('.active')) {
                $li.removeClass('active active-sm');
                $('ul:first', $li).slideUp(function() {
                    setContentHeight();
                });
            } else {
                // prevent closing menu if we are on child menu
                if (!$li.parent().is('.child_menu')) {
                    $.sidebarMenu.find('li').removeClass('active active-sm');
                    $.sidebarMenu.find('li ul').slideUp();
                }

                $li.addClass('active');

                $('ul:first', $li).slideDown(function() {
                    setContentHeight();
                });
            }
        });
    }
}


$(document).ajaxComplete(function() {
    setContentHeight();
});

// Sidebar
//$(document).ready(function() {


// check active menu
$.sidebarMenu.find('a[href="' + currentURL + '"]').parent('li').addClass('current-page');

$.sidebarMenu.find('a').filter(function() {
    return this.href == currentURL;
}).parent('li').addClass('current-page').parents('ul').slideDown(function() {
    setContentHeight();
}).parent().addClass('active');

// fixed sidebar
if ($.fn.mCustomScrollbar) {
    $('.menu_fixed').mCustomScrollbar({
        autoHideScrollbar: true,
        theme: 'minimal',
        mouseWheel: { preventDefault: true }
    });
}
//});