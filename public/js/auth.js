import { templateLoader } from './template-loader';
import { data } from './data';

let auth = (() => {
    function getLoginPage(context) {
        templateLoader.get("login")
            .then((template) => {
                context.$element().html(template());

                $("#login-btn").on("click", function (ev) {
                    getInput()
                        .then((user) => {
                            return data.loginUser(user);
                        })
                        .then((result) => {
                            changeStyles(result.username);
                            context.redirect("#/home");
                            toastr.success("Добре дошъл, пътешественико!");
                        })
                        .catch((e) => {
                            if (e.responseText) {
                                let response = JSON.parse(e.responseText);
                                toastr.error(response.msg);
                            } else {
                                toastr.error(e.message);
                            }
                        });

                    ev.preventDefault();
                    return false;
                });
            });
    }

    function getRegisterPage(context) {
        templateLoader.get("register")
            .then((template) => {
                context.$element().html(template());
                let userInfo;
                $("#register-btn").on("click", function (ev) {
                    getInput()
                        .then((user) => {
                            userInfo = user;
                            return data.registerUser(user);
                        })
                        .then(() => {
                            return data.loginUser(userInfo);
                        })
                        .then((result) => {
                            changeStyles(result.username);
                            context.redirect("#/home");
                            toastr.success("Успешна регистрация!");
                        })
                        .catch((e) => {
                            if (e.responseText) {
                                let response = JSON.parse(e.responseText);
                                toastr.error(response.msg);
                            } else {
                                toastr.error(e.message);
                            }
                        });


                    ev.preventDefault();
                    return false;
                });
            });
    }

    function getInput() {
        let promise = new Promise((resolve, reject) => {
            let username = $("#username").val();
            let password = $("#password").val();
            let confirmPassword = $("#confirm-password").val();

            resolve({ username: username, password: password, confirmPassword: confirmPassword });
        });
        return promise;
    }

    function changeStyles(username) {
        $("#login-link").addClass("hidden");
        $("#logout-link").removeClass("hidden");
        $("#create-link").removeClass("hidden");
        let profileLink = $("#profile-link");
        profileLink.removeClass("hidden");
        profileLink.find("#profile-link-ref").attr("href", `#/profiles/${username}`);
        $(".home-link").addClass("current-menu-item");

        data.isAdminLoggedIn()
            .then(isAdminloggedIn => {
                if(isAdminloggedIn) {
                    $(".requests-link").removeClass("hidden");
                }
            });
    }

    return {
        login: getLoginPage,
        register: getRegisterPage
    };
})();

export { auth };