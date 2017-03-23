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
        return requester.putJSON(`api/sites/${siteId}`, putData)
                .then((serverResponseObj) => {
                    let userVisitedSites = serverResponseObj.visitedSites;
                    localStorage.setItem(VISITED_SITES, JSON.stringify(userVisitedSites));
                });
    }

    function isSiteVisitedByCurrentUser(siteNumber) {
        let visitedSites = JSON.parse(localStorage.getItem(VISITED_SITES));
        if(!visitedSites) {
            return false;
        }
        
        return visitedSites.some(site => site.number === siteNumber);
    }

    function addSiteComment(siteId, content, date, username ) {
        let putData = { commentContent: content, commentDate: date, username: username };
        return requester.putJSON(`api/sites/${siteId}/comment`, putData);
    }

    function getNews() {
        return requester.getJSON("api/news");
    }

    function getUserByUsername(username) {
        return requester.getJSON(`api/profiles/${username}`);
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
                localStorage.setItem(VISITED_SITES, JSON.stringify(userInfo.visitedSites));
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
                result.visitedSites = localStorage.getItem(VISITED_SITES);
            }
            resolve(result);
        })
    }

    return {
        getSites,
        getSiteById,
        markSiteAsVisited,
        isSiteVisitedByCurrentUser,
        addSiteComment,
        getNews,
        getUserByUsername,
        loginUser,
        registerUser,
        logoutUser,
        isLoggedIn
    }
})();

export { data };