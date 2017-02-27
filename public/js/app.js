import { router } from './router';
import { data } from './data';

(function () {
    router.init();

    data.isLoggedIn()
        .then((result) => {
            if (result.username) {
                $("#login-link").addClass("hidden");
                $("#logout-link").removeClass("hidden");
                $("#create-link").removeClass("hidden");
                $("#profile-link").removeClass("hidden")
                    .attr("href", `#/profiles/${result.username}`);
            }
        });
}());