import { templateLoader } from './template-loader';
import { data } from './data';
import { animations } from './animations';

let home = (() => {
    function getHome(context) {
        let serverResponse;
        let templateItems = {};

        Promise.all([data.getSites(), templateLoader.get("home")])
            .then(([serverResponse, template]) => {
                let sites = serverResponse.data;

                for (let site of sites) {
                    site.description = site.description.slice(0, 400) + "...";
                }

                sites.sort(sortSitesByVisits);

                function sortSitesByVisits(a, b) {
                    return b.numberOfVisits - a.numberOfVisits;
                }

                templateItems.topSites = sites.slice(0, 3);
                templateItems.popularSites = sites.slice(3, 9);

                for (let site of templateItems.popularSites) {
                    site.description = site.description.slice(0, 60) + "...";
                }

                let homeHtml = template(templateItems);
                context.$element().html(homeHtml);
                animations.homePageFlex();

                $(".slider-readmore").on("click", function () {
                    $(".description-container").toggleClass("large");
                });

                animations.homePageCarousel();

                $(".sites-carousel-item").hover(
                    function mouseIn() {
                        let plusItem = $(this).find(".overlay-plus");
                        plusItem.addClass("hover");
                    },
                    function mouseOut() {
                        let plusItem = $(this).find(".overlay-plus");
                        plusItem.removeClass("hover");
                    }
                );

                $(".news-item").hover(
                    function mouseIn() {
                        let item = $(this);
                        item.addClass("active");
                        let newsContent = item.find(".news-item-content");
                        newsContent.removeClass("hidden");
                    },
                    function mouseOut() {
                        let item = $(this);
                        item.removeClass("active");
                        let newsContent = item.find(".news-item-content");
                        newsContent.addClass("hidden");
                    }
                );
            });
    }

    return {
        renderPage: getHome
    }
})();

export { home };