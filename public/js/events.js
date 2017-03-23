$("#navbarTogglerDemo01").on("click", ".nav-item", function (event) {
    removeCurrentMenuItem("#navbarTogglerDemo01");
    removeCurrentMenuItem("#footer-menu-right");

    var targetListItem = $(event.target).parent();
    targetListItem.addClass("current-menu-item");

    //footer navbar
    var footerMenuClass = checkElementForClass(targetListItem, "-link");
    if (footerMenuClass) {
        var footerMenuItem = $("#footer-menu-right").find("." + footerMenuClass);
        footerMenuItem.addClass("current-menu-item");
    }
});

$("#navbarTogglerDemo01").on("click", "a", function () {
    $("#navbarTogglerDemo01").collapse('hide');
});

$("#footer-menu-right").on("click", ".nav-item", function (event) {
    removeCurrentMenuItem("#footer-menu-right");

    var targetListItem = $(event.target).parent();
    targetListItem.addClass("current-menu-item");

    //header navbar
    var footerMenuClass = checkElementForClass(targetListItem, "-link");
    if (footerMenuClass) {
        removeCurrentMenuItem("#navbarTogglerDemo01");
        var headerMenuItem = $("#navbarTogglerDemo01").find("." + footerMenuClass);
        headerMenuItem.addClass("current-menu-item");
    }
});

function removeCurrentMenuItem(selector) {
    var currentFooterItem = $(selector).find(".current-menu-item");
    currentFooterItem.removeClass("current-menu-item");
}

function checkElementForClass(element, className) {
    var elementClasses = element.prop('className').split(' ');
    var targetClass = elementClasses.find(function(el) {
        return el.indexOf(className) > 0;
    });

    return targetClass;
}

$(window).on("load", function () {
    $('#content').removeClass("loading");
});