import { templateLoader } from './template-loader';
import { data } from './data';

let auth = (() => {
    function getPage(context) {
        templateLoader.get("login")
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
                            console.log(result);
                            // if (result.result.err) {
                            //     throw new Error(result.result.err);
                            // }

                            changeStyles(result.username);

                            context.redirect("#/home");

                            toastr.success("Успешна регистрация!");
                        })
                        .catch((e) => {
                            if (e.responseText) {
                                let response = JSON.parse(e.responseText);
                                toastr.error(response.errMsg);
                            } else {
                                toastr.error(e.message);
                            }
                        });


                    ev.preventDefault();
                    return false;
                });

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
                                toastr.error(response.result.err);
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

            // if (typeof username !== "string" || username.length < 6 || username.length > 30) {
            //     reject(new Error("Invalid username lenght"));
            //     return;
            // }

            // let usernameSubstr = username.replace(/[A-Za-z0-9_.]/g, "");
            // if (usernameSubstr.length > 0) {
            //     reject(new Error("Invalid username characters"));
            //     return;
            // }

            // $("username").val("");
            // $("password").val("");
            resolve({ username: username, password: password });
        });
        return promise;
    }

    function changeStyles(username) {
        $("#login-link").addClass("hidden");
        $("#logout-link").removeClass("hidden");
        $("#create-link").removeClass("hidden");
        $("#profile-link").removeClass("hidden")
            .attr("href", `#/profiles/${username}`);
    }

    return {
        renderPage: getPage
    };
})();

export { auth };