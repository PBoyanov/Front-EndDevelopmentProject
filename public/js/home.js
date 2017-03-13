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
                    site.description = site.description.slice(0, 100) + "...";
                }
                templateItems.sites = sites;
                
                let homeHtml = template(templateItems);
                context.$element().html(homeHtml);
                animations.homePageFlex();
            });
    }

    return {
        renderPage: getHome
    }
})();

export { home };