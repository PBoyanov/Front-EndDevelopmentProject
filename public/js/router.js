import { controllers } from "./controllers";

let router = (() => {

    function init() {
        let sammyApp = Sammy("#content", function () {
            this.get("#/", function (context) {
                context.redirect("#/home");
            });

            this.get("#/home", controllers.home.renderPage);

            this.get("#/search", controllers.search.getSearchPage);

            this.get("#/register", controllers.auth.register);

            this.get("#/login", controllers.auth.login);

            this.get("#/logout", controllers.logout.execute);

            this.get("#/sites", function (context) {
                context.redirect("#/all-sites", {orderby: "number"});
            });

            this.get("#/all-sites/:id", controllers.sites.getSiteDetailsPage);

            this.get("#/all-sites", controllers.sites.getSitesPage);

            this.get("#/news/:id", controllers.news.getNewsItemDetailsPage);

            this.get("#/news", controllers.news.getNewsPage);

            this.get("#/profiles/:username", controllers.profiles.getProfilePage);

        });

        sammyApp.run("#/");
    }

    return {
        init: init
    }

})();

export { router };