import { templateLoader } from './template-loader';
import { data } from './data';

let sites = (() => {
    function getSitesPage(context) {
        let serverResponseSites;

        Promise.all([data.getSites(), templateLoader.get("all-sites")])
            .then(([serverResponseSites, template]) => {
                let sites = serverResponseSites.data;
                processSitesData(sites);

                let homeHtml = template(sites);
                context.$element().html(homeHtml);
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