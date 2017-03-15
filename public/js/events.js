$("#navbarTogglerDemo01").on("click", ".nav-item", function (event) {
    let currentItem = $("#navbarTogglerDemo01").find(".current-menu-item");  
    currentItem.removeClass("current-menu-item");

    let targetListItem = $(event.target).parent();
    targetListItem.addClass("current-menu-item");
});

$(window).on("load", function () {
    $('#content').removeClass("loading");
});