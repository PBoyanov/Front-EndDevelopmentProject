import { templateLoader } from './template-loader';
import { data } from './data';

let profiles = (() => {
    function getProfilePage(context) {
        let templateItems = {};
        let username = context.params["username"];

        Promise.all([data.getUser(username), data.isLoggedIn(), templateLoader.get("profile")])
            .then(([serverResponseUser, currentUserObj, template]) => {
                let userData = (serverResponseUser.user ? serverResponseUser.user : []);
                userData.visitedSitesCount = userData.visitedSites.length;

                userData.visitedSites.sort(sortSitesByNumber);

                templateItems.userData = userData;
                let currentUsername = currentUserObj.username;
                templateItems.isCurrentUser = (userData.username === currentUsername);

                let pageHtml = template(templateItems);
                context.$element().html(pageHtml);

                $("#nav-tabs").on("click", ".nav-link:not(.active)", function (event) {
                    let navLinks = $("#nav-tabs").find(".nav-link");

                    for (let link of navLinks) {
                        $(link).toggleClass("active");
                    }

                    let dataContainers = $("#user-data").find(".tab-pane");

                    for (let container of dataContainers) {
                        $(container).toggleClass("hidden");
                    }
                });

                $("#visited-sites .site-btn").on("click", function (event) {
                    let siteId = $(event.target).parentsUntil(".sites-table-body", ".site-row")
                                                .attr("site-number");
                    let username = userData.username;
                    let isReverse = $(event.target).hasClass("reverse");
                    data.markSiteAsVisited(siteId, username, isReverse);
                    document.location.reload(true);
                });
            });
    }

    function sortSitesByNumber(a, b) {
        return a.number - b.number;
    }

    return {
        getProfilePage
    }
})();

export { profiles };