import { templateLoader } from './template-loader';
import { data } from './data';

let sites = (() => {
    let templateItems = {};
    const DROPDOWN_DEFAULT_VALUE = "Изберете област";

    function getSitesPage(context) {
        let serverResponseSites;

        Promise.all([data.getSites(), templateLoader.get("all-sites")])
            .then(([serverResponseSites, template]) => {
                let sites = serverResponseSites.data;
                templateItems.filteredOnThis = DROPDOWN_DEFAULT_VALUE;

                if(context.params["region"]) {
                    let region = context.params["region"];
                    sites = sites.filter(site => site.region === region);

                    templateItems.filteredOnThis = region;
                }

                processSitesData(sites);
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

                $('#filter-by-region .dropdown-item').on('click', function () {
                    let dropdownItem = $(this);
                    let filterOnThis = dropdownItem.text();

                    console.log(filterOnThis);
                    if(!dropdownItem.hasClass("default")) {
                        context.redirect(`#/sites?region=${filterOnThis}`);
                    } else {
                        context.redirect("#/sites");
                    }
                });
            });
    }

    function processSitesData(sites) {
        for (let site of sites) {
            site.description = site.description.slice(0, 120) + "...";
        }
    }

    return {
        getSitesPage
    }
})();

export { sites };