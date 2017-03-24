import { templateLoader } from './template-loader';
import { data } from './data';

let sites = (() => {
    const DROPDOWN_DEFAULT_VALUE = "Изберете област";
    const ORDER_BY_VALUES = {
        number: "number",
        visits: "visits"
    };

    function getSitesPage(context) {
        let templateItems = {};
        let serverResponseSites;

        Promise.all([data.getSites(), templateLoader.get("all-sites")])
            .then(([serverResponseSites, template]) => {
                let sites = serverResponseSites.data;
                templateItems.filteredOnThis = DROPDOWN_DEFAULT_VALUE;

                if (context.params["region"]) {
                    let region = context.params["region"];
                    sites = sites.filter(site => site.region === region);

                    templateItems.filteredOnThis = region;
                }

                //default orderBy
                templateItems.orderByNumber = true;
                templateItems.orderByVisits = false;
                let orderBy;
                if (context.params["orderby"]) {
                    orderBy = context.params["orderby"];
                    if (orderBy === ORDER_BY_VALUES.visits) {
                        templateItems.orderByNumber = false;
                        templateItems.orderByVisits = true;
                    }
                }

                processSitesData(sites, orderBy);
                templateItems.sites = sites;

                let pageHtml = template(templateItems);
                context.$element().html(pageHtml);

                $(".site").hover(
                    function mouseIn() {
                        let itemWrap = $(this).find(".site-wrap");
                        itemWrap.addClass("hover");
                    },
                    function mouseOut() {
                        let itemWrap = $(this).find(".site-wrap");
                        itemWrap.removeClass("hover");
                    }
                );

                $(".main-ad-box").hover(
                    function mouseIn() {
                        let plusItem = $(this).find(".overlay-plus");
                        plusItem.addClass("hover");
                    },
                    function mouseOut() {
                        let plusItem = $(this).find(".overlay-plus");
                        plusItem.removeClass("hover");
                    }
                );

                $("#filter-by-region .dropdown-item").on('click', function () {
                    context.path = context.path.replace("&", "");

                    let regionUrlPartIndex = context.path.indexOf("region");
                    if (regionUrlPartIndex > 0) {
                        context.path = context.path.slice(0, regionUrlPartIndex);
                    }

                    let dropdownItem = $(this);
                    let filterOnThis = dropdownItem.text();
                    if (!dropdownItem.hasClass("default")) {
                        context.redirect(`${context.path}&region=${filterOnThis}`);
                    } else {
                        let orderByUrlPartIndex = context.path.indexOf("orderby=");
                        let orderByUrlPart = context.path.slice(orderByUrlPartIndex + 8);
                        context.redirect("#/sites");
                    }
                });

                $("#order-by .order-btn:not(.active)").on("click", function (ev) {
                    let regionUrlPartIndex = context.path.indexOf("region");
                    let regionFilter = "";
                    if (regionUrlPartIndex > 0) {
                        let regionUrlPart = context.path.slice(regionUrlPartIndex);
                        context.path = context.path.slice(0, regionUrlPartIndex - 1);
                        regionFilter = "&" + regionUrlPart;
                    }

                    context.path = context.path
                        .replace("orderby=number", "")
                        .replace("orderby=visits", "");

                    let orderByThis = ev.target.id;
                    context.redirect(`${context.path}orderby=${orderByThis}${regionFilter}`);
                });
            });
    }

    function getSingleSitePage(context) {
        let templateItems = {};
        let serverResponse;
        let siteId = context.params["id"];

        Promise.all([data.getSiteById(siteId), data.isLoggedIn(), data.getUserVisitedSites(), templateLoader.get("site-details")])
            .then(([serverResponseSite, loggedUser, serverResponseVisitedSites, template]) => {
                let site = serverResponseSite.data;
                countComments(site);
                templateItems.isSingleComment = (site.comments.length === 1);
                templateItems.site = site;

                templateItems.isLoggedIn = !!(loggedUser.username);

                let visitedSitesNumbers = (serverResponseVisitedSites.siteNumbers ? 
                    serverResponseVisitedSites.siteNumbers : []);
                templateItems.isSiteVisited = visitedSitesNumbers.includes(site.number);

                let pageHtml = template(templateItems);
                context.$element().html(pageHtml);

                $(".main-ad-box").hover(
                    function mouseIn() {
                        let plusItem = $(this).find(".overlay-plus");
                        plusItem.addClass("hover");
                    },
                    function mouseOut() {
                        let plusItem = $(this).find(".overlay-plus");
                        plusItem.removeClass("hover");
                    }
                );

                $(".site-content .site-btn").on("click", function (event) {
                    let siteId = site.id;
                    let username = loggedUser.username;
                    let isReverse = $(event.target).hasClass("reverse");
                    data.markSiteAsVisited(siteId, username, isReverse);
                    document.location.reload(true);
                });

                $("#post-comment").on("click", function () {
                    let commentContent = $("#comment").val();
                    if (commentContent.length === 0) {
                        toastr.error("Коментарът не може да бъде празен!");
                    } else {
                        let siteId = site.id;
                        let date = new Date();
                        let username = loggedUser.username;
                        data.addSiteComment(siteId, commentContent, date, username);
                        document.location.reload(true);
                    }
                });
            });
    }

    function processSitesData(sites, orderBy) {
        if (orderBy === ORDER_BY_VALUES.number) {
            sites.sort(sortSitesByNumber);
        } else if (orderBy === ORDER_BY_VALUES.visits) {
            sites.sort(sortSitesByVisits);
        } else {
            sites.sort(sortSitesByNumber);
        }

        for (let site of sites) {
            site.description = site.description.slice(0, 120) + "...";
        }
    }

    function sortSitesByNumber(a, b) {
        return a.number - b.number;
    }

    function sortSitesByVisits(a, b) {
        return b.numberOfVisits - a.numberOfVisits;
    }

    function countComments(site) {
        site.commentsCount = site.comments.length;
    }

    return {
        getSitesPage,
        getSingleSitePage
    }
})();

export { sites };