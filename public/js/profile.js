import { templateLoader } from './template-loader';
import { data } from './data';

let profiles = (() => {
    function getProfilePage(context) {
        Promise.all([data.getUserData(), templateLoader.get("profile")])
            .then(([serverResponseUser, template]) => {
                let userData = (serverResponseUser.user ? serverResponseUser.user : []);

                let pageHtml = template(userData);
                context.$element().html(pageHtml);
            });
    }

    return {
        getProfilePage
    }
})();

export { profiles };