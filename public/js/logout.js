import { data } from './data';

let logout = (() => {
    function performLogout(context) {
        data.logoutUser()
            .then(() => {
                changeStyles();
                context.redirect("#/home");
                toastr.success("До нови срещи!");
            });
    }

    function changeStyles(username) {
        $("#login-link").removeClass("hidden");
        $("#logout-link").addClass("hidden");
        $("#create-link").addClass("hidden");
        let profileLink = $("#profile-link");
        profileLink.addClass("hidden");
        profileLink.find("#profile-link-ref").attr("href", `#/profiles/${username}`);
        $(".home-link").addClass("current-menu-item");

        let requestsLink = $("#requests-link");
        if(!requestsLink.hasClass("hidden")) {
            $(".requests-link").addClass("hidden");
        }
    }

    return {
        execute: performLogout
    };
})();

export { logout };