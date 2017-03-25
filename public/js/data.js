import { requester } from './requester';
import { validator } from './validator';

let data = (() => {
    const USERNAME_KEY = "username";
    const AUTH_KEY = "auth-key";
    const VISITED_SITES = "visited-sites";

    function getSites() {
        return requester.getJSON("api/sites");
    }

    function getSiteById(id) {
        return requester.getJSON(`api/sites/${id}`);
    }

    function markSiteAsVisited(siteId, username, isReverse) {
        let putData = { siteId: siteId, username: username, isReverse: isReverse };
        return requester.putJSON(`api/sites/${siteId}`, putData);
    }

    function addSiteComment(siteId, content, date, username ) {
        let putData = { commentContent: content, commentDate: date, username: username };
        return requester.putJSON(`api/sites/${siteId}/comment`, putData);
    }

    function getNews() {
        return requester.getJSON("api/news");
    }

    function getNewsItemById(id) {
        return requester.getJSON(`api/news/${id}`);
    }

    function addNewsItemComment(newsItemId, content, date, username ) {
        let putData = { commentContent: content, commentDate: date, username: username };
        return requester.putJSON(`api/news/${newsItemId}/comment`, putData);
    }

    function registerUser(user) {
        validator.validateUsername(user.username);
        validator.validatePassword(user.password);
        validator.validateConfirmPassword(user.password, user.confirmPassword);

        return requester.postJSON("api/register", user);
    }

    function loginUser(user) {
        validator.validateUsername(user.username);
        validator.validatePassword(user.password);

        return requester.postJSON("api/login", user)
            .then((result) => {
                let userInfo = result.body;
                localStorage.setItem(USERNAME_KEY, userInfo.username);
                localStorage.setItem(AUTH_KEY, userInfo.token);
                return { username: userInfo.username };
            });
    }

    function logoutUser() {
        return new Promise((resolve, reject) => {
            localStorage.removeItem(USERNAME_KEY);
            localStorage.removeItem(AUTH_KEY);

            resolve();
        });
    }

    function isLoggedIn() {
        return new Promise((resolve, reject) => {
            let result = {};
            if (localStorage.getItem(USERNAME_KEY) && localStorage.getItem(AUTH_KEY)) {
                result.username = localStorage.getItem(USERNAME_KEY);
            }
            resolve(result);
        })
    }

    function getUserData(sitesOnly = false) {
        return new Promise((resolve, reject) => {
            this.isLoggedIn()
                .then((result) => {
                    if(result.username) {
                        let username = result.username;
                        let sitesUrlPart = (sitesOnly ? "/sites" : "");
                        let serverResponse = requester.getJSON(`api/profiles/${username}${sitesUrlPart}`);
                        resolve(serverResponse);
                    } else {
                        let emptyArray = [];
                        resolve(emptyArray);
                    }
                })
        });
    }

    return {
        getSites,
        getSiteById,
        markSiteAsVisited,
        addSiteComment,
        getNews,
        getNewsItemById,
        addNewsItemComment,
        loginUser,
        registerUser,
        logoutUser,
        isLoggedIn,
        getUserData
    }
})();

export { data };