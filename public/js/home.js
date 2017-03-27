import { templateLoader } from "./template-loader";
import { data } from "./data";
import { animations } from "./animations";

let home = (() => {
    let templateItems = {};

    function getHome(context) {
        let serverResponseSites,
            serverResponseNews;

        Promise.all([data.getSites(), data.getNews(), templateLoader.get("home")])
            .then(([serverResponseSites, serverResponseNews, template]) => {
                let sites = serverResponseSites.data;
                processSitesData(sites);

                let news = serverResponseNews.data;
                processNewsData(news);

                let homeHtml = template(templateItems);
                context.$element().html(homeHtml);
                animations.homePageFlex();

                $(".slider-readmore").on("click", function () {
                    $(".description-container").toggleClass("large");
                });

                animations.homePageCarousel();

                hoverOverlayPlusItem(".sites-carousel-item");
                hoverOverlayPlusItem(".main-ad-box");

                $(".news-item").hover(
                    function mouseIn() {
                        let itemWrap = $(this).find(".news-item-wrap");
                        itemWrap.addClass("hover");
                    },
                    function mouseOut() {
                        let itemWrap = $(this).find(".news-item-wrap");
                        itemWrap.removeClass("hover");
                    }
                );

                $("#news-list").on("click", ".news-item", function (event) {
                    let previousActiveItem = $("#news-list").find(".active");
                    let itemWrap;

                    let target = $(event.target);
                    if (target.hasClass("news-item-wrap")) {
                        itemWrap = target;
                    } else {
                        itemWrap = target.parentsUntil(".news-item", ".news-item-wrap");
                    }

                    if (!itemWrap.hasClass("active")) {
                        previousActiveItem.removeClass("active");
                        itemWrap.addClass("active");
                    } else {
                        itemWrap.removeClass("active");
                    }
                });
            });
    }

    function processSitesData(sites) {
        for (let site of sites) {
            site.description = site.description.slice(0, 400) + "...";
        }

        sites.sort(sortSitesByVisits);
        templateItems.topSites = sites.slice(0, 3);
        templateItems.popularSites = sites.slice(3, 9);

        for (let site of templateItems.popularSites) {
            site.description = site.description.slice(0, 60) + "...";
        }
    }

    function processNewsData(news) {
        for (let newsItem of news) {
            newsItem.content = newsItem.content.slice(0, 200) + "...";
            newsItem.date = new Date(newsItem.date);
            newsItem.commentsCount = newsItem.comments.length;
            newsItem.isSingleComment = (newsItem.comments.length === 1);
        }

        news.sort(sortNewsByDate);

        for (let newsItem of news) {
            newsItem.date = formatDate(newsItem.date);
        }

        templateItems.news = news.slice(0, 6);
    }

    function sortSitesByVisits(a, b) {
        return b.numberOfVisits - a.numberOfVisits;
    }

    function sortNewsByDate(a, b) {
        return b.date - a.date;
    }

    function formatDate(date) {
        let monthNames = [
            "Януари", "Февруари", "Март",
            "Април", "Май", "Юни", "Юли",
            "Август", "Септевмри", "Октомври",
            "Ноември", "Декевмври"
        ];

        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();

        return day + " " + monthNames[monthIndex] + " " + year;
    }

    function hoverOverlayPlusItem(selector) {
        $(selector).hover(
            function mouseIn() {
                let plusItem = $(this).find(".overlay-plus");
                plusItem.addClass("hover");
            },
            function mouseOut() {
                let plusItem = $(this).find(".overlay-plus");
                plusItem.removeClass("hover");
            }
        );
    }

    return {
        renderPage: getHome
    }
})();

export { home };