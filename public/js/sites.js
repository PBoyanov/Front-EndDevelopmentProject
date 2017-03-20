import { templateLoader } from './template-loader';
import { data } from './data';

let sites = (() => {
    let templateItems = {};

    function getSitesPage(context) {
        let serverResponseSites;

        Promise.all([data.getSites(), templateLoader.get("all-sites")])
            .then(([serverResponseSites, template]) => {
                let sites = serverResponseSites.data;
                //console.log(sites);
                processSitesData(sites);
                templateItems.sites = sites;

                let pageHtml = template(templateItems);
                console.log(pageHtml);
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
            });
    }

    function processSitesData(sites) {
        for (let site of sites) {
            site.description = site.description.slice(0, 120) + "...";
            site.commentsLength = site.comments.length;
        }
    }

    return {
        getSitesPage
    }
})();

export { sites };