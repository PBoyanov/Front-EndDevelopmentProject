import { requester } from "./requester";
import { validator } from "./validator";

let data = (() => {
    const USERNAME_KEY = "username";
    const AUTH_KEY = "auth-key";
    const USER_ROLES = "user-roles";
    const ADMIN_ROLE = "admin";
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

    function sendVisitDocument(username, visitRequest) {
        let putData = { visitRequest };
        return requester.putJSON(`api/user/${username}/visitRequest`, visitRequest);
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
                localStorage.setItem(USER_ROLES, userInfo.roles);
                return { username: userInfo.username };
            });
    }

    function logoutUser() {
        return new Promise((resolve, reject) => {
            localStorage.removeItem(USERNAME_KEY);
            localStorage.removeItem(AUTH_KEY);
            localStorage.removeItem(USER_ROLES);
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
        });
    }

    function isAdminLoggedIn() {
        return new Promise((resolve, reject) => {
            let result = (localStorage.getItem(USER_ROLES).includes(ADMIN_ROLE));
            resolve(result);
        });
    }

    function getUser(username) {
        return requester.getJSON(`api/profiles/${username}`);
    }

    function getUserVisitedSites() {
        return new Promise((resolve, reject) => {
            this.isLoggedIn()
                .then((result) => {
                    if(result.username) {
                        let username = result.username;
                        let serverResponse = requester.getJSON(`api/profiles/${username}/sites`);
                        resolve(serverResponse);
                    } else {
                        let emptyArray = [];
                        resolve(emptyArray);
                    }
                });
        });
    }

    return {
        getSites,
        getSiteById,
        markSiteAsVisited,
        sendVisitDocument,
        addSiteComment,
        getNews,
        getNewsItemById,
        addNewsItemComment,
        loginUser,
        registerUser,
        logoutUser,
        isLoggedIn,
        isAdminLoggedIn,
        getUser,
        getUserVisitedSites
    }
})();

export { data };