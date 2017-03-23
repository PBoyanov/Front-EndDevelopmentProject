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

    function createMaterial(title, description, img = "") {
        return isLoggedIn()
            .then((result) => {
                if (!result.username) {
                    throw new Error("You have to be logged in to create material");
                }
            })
            .then(() => {
                validator.validateTitle(title);
                validator.validateDescription(description);

                let postData = { title, description };
                if (img !== "") {
                    postData.img = img;
                }

                return postData;
            })
            .then((postData) => {
                let headers = { [AUTH_KEY]: localStorage.getItem(AUTH_KEY) };
                return requester.postJSON("api/materials", postData, headers);
            });
    }

    function addComment(id, text) {
        return isLoggedIn()
            .then((result) => {
                if (!result.username) {
                    throw new Error("You have to be logged in to comment!");
                }
            })
            .then(() => {
                let postData = { "commentText": text };
                let headers = { [AUTH_KEY]: localStorage.getItem(AUTH_KEY) };
                return requester.putJSON(`api/materials/${id}/comments`, postData, headers);
            });
    }

    function addToCategory(id, category) {
        return isLoggedIn()
            .then((result) => {
                if (!result.username) {
                    throw new Error("You have to be logged in to add material to category!");
                }
            })
            .then(() => {
                let postData = { id, category };
                let headers = { [AUTH_KEY]: localStorage.getItem(AUTH_KEY) };
                return requester.postJSON("api/user-materials", postData, headers);
            });
    }

    return {
        getSites,
        getSiteById,
        markSiteAsVisited,
        isSiteVisitedByCurrentUser,
        getNews,
        getUserByUsername,
        loginUser,
        registerUser,
        logoutUser,
        isLoggedIn,
        createMaterial,
        addComment,
        addToCategory
    }
})();

export { data };