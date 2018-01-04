import { router } from "./router";
import { data } from "./data";

(function () {
    router.init();

    data.isLoggedIn()
        .then((result) => {
            if (result.username) {
                $("#login-link").addClass("hidden");
                $("#logout-link").removeClass("hidden");
                $("#create-link").removeClass("hidden");
                let profileLink = $("#profile-link");
                profileLink.removeClass("hidden");
                profileLink.find("#profile-link-ref").attr("href", `#/profiles/${result.username}`);

                data.isAdminLoggedIn()
                    .then(isAdminloggedIn => {
                        if(isAdminloggedIn) {
                            $(".requests-link").removeClass("hidden");
                        }
                    });
            }
        });
}());