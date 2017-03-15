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
                templateItems.sites = sites;

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
            });
    }

    return {
        renderPage: getHome
    }
})();

export { home };