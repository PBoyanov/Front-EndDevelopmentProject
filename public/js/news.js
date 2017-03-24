import { templateLoader } from './template-loader';
import { data } from './data';

let news = (() => {
     let templateItems = {};

    function getNewsPage(context) {

        Promise.all([data.getNews(), templateLoader.get("all-news")])
            .then(([serverResponseNews, template]) => {
                let news = serverResponseNews.data;

                processNewsData(news);
                templateItems.news = news;

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
            });
    }

    function processNewsData(news) {
        for (let newsItem of news) {
            newsItem.content = newsItem.content.slice(0, 200) + "...";
            newsItem.date = new Date(newsItem.date);
            newsItem.commentsCount = newsItem.comments.length;
            newsItem.isSingleComment = (newsItem.comments.length === 1);
        }

        news.sort(sortNewsByDate);

        for (let newsItem of news) {
            newsItem.date = formatDate(newsItem.date);
        }

        templateItems.news = news.slice(0, 6);
    }

    function sortNewsByDate(a, b) {
        return b.date - a.date;
    }

    function formatDate(date) {
        let monthNames = [
            "Януари", "Февруари", "Март",
            "Април", "Май", "Юни", "Юли",
            "Август", "Септевмри", "Октомври",
            "Ноември", "Декевмври"
        ];

        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    return {
        getNewsPage
    }

})();

export { news };