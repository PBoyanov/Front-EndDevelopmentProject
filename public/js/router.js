import { controllers } from './controllers';

let router = (() => {

    function init() {
        let sammyApp = Sammy("#content", function () {
            this.get('#/', function (context) {
                context.redirect('#/home');
            });

            this.get("#/home", controllers.home.renderPage);

            this.get('#/register', controllers.auth.register);

            this.get("#/login", controllers.auth.login);

            this.get("#/logout", controllers.logout.execute);

            this.get("#/sites", function (context) {
                context.redirect("#/all-sites", {orderby: "number"});
            });

            this.get("#/all-sites/:id", controllers.sites.getSingleSitePage);

            this.get("#/all-sites", controllers.sites.getSitesPage);

            // this.get("#/profiles/:username", controllers.userProfile.all);

            // this.get("#/profiles/:username/:category", controllers.userProfile.all);

        });

        sammyApp.run('#/');
    }

    function navigate(path) {
        //navigo.navigate(path);
    }

    //parse query params in object form (paramName: value)
    function getQueryParams(qstr) {
        var query = {};
        var a = qstr.split('&');
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
    }

    return {
        init: init,
        navigate: navigate
    }

})();

export { router };