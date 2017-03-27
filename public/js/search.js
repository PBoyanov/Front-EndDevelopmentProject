import { templateLoader } from "./template-loader";
import { data } from "./data";

let search = (() => {
    function getSearchPage(context) {
        Promise.all([templateLoader.get("search")])
            .then(([template]) => {
                
                let pageHtml = template();
                context.$element().html(pageHtml);

                $(".sites-results-item").hover(
                    function mouseIn() {
                        let itemWrap = $(this).find(".sites-results-item-wrap");
                        itemWrap.addClass("hover");
                    },
                    function mouseOut() {
                        let itemWrap = $(this).find(".sites-results-item-wrap");
                        itemWrap.removeClass("hover");
                    }
                );
            });
    }

    return {
        getSearchPage
    }
})();

export { search };