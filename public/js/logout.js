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
        $("#profile-link").addClass("hidden");
        $(".home-link").addClass("current-menu-item");
    }

    return {
        execute: performLogout
    };
})();

export { logout };