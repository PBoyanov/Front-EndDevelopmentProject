import { templateLoader } from './template-loader';
import { data } from './data';

let news = (() => {
    let templateItems = {};
    const NEWS_ON_PAGE = 5;

    function getNewsPage(context) {

        Promise.all([data.getNews(), templateLoader.get("all-news")])
            .then(([serverResponseNews, template]) => {
                let news = serverResponseNews.data;

                processNewsData(news);
                templateItems.newsPages = createPages(news, NEWS_ON_PAGE);
                let newsPagesCount = templateItems.newsPages.length;

                let pageHtml = template(templateItems);
                context.$element().html(pageHtml);

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

                $(".sync-pagination").twbsPagination({
                    totalPages: newsPagesCount,
                    visiblePages: 5,
                    first: "<<",
                    prev: "<",
                    next: ">",
                    last: ">>",
                    onPageClick: function (event, page) {
                        let currentPage = $("#news").find(".news-page:not(.hidden)");
                        currentPage.addClass("hidden");
                        let visiblePage = $('#news').find(`#news-page-${page}`);
                        visiblePage.removeClass("hidden");
                    }
                });
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

    function createPages(elements, maxItemsOnPage) {
        let pages = [];
        let counter = 0;
        let pagesCount = 0;
        let singlePage = {};
        singlePage.number = pagesCount + 1;
        singlePage.defaultPage = true;
        singlePage.items = [];
        for (let i = 0; i < elements.length; i += 1) {
            if (counter < maxItemsOnPage && i !== elements.length - 1) {
                //if < maxItemsOnPage on the current page, push comment to current page
                singlePage.items.push(elements[i]);
                counter = counter + 1;
            } else {
                //if last comment
                if (i === elements.length - 1) {
                    //and < maxItemsOnPage on current page, push comment to current page and push page
                    if (counter < maxItemsOnPage) {
                        singlePage.items.push(elements[i]);
                        pages.push(singlePage);
                        //if >= maxItemsOnPage on current page, push page create new page and push it
                    } else {
                        pages.push(singlePage);
                        singlePage = {};
                        pagesCount += 1;
                        singlePage.number = pagesCount + 1;
                        singlePage.items = [];
                        singlePage.items.push(elements[i]);
                        counter = 1;
                        pages.push(singlePage);
                    }
                } else {
                    //if >= maxItemsOnPage on current page, push page and create new page
                    pages.push(singlePage);
                    singlePage = {};
                    pagesCount += 1;
                    singlePage.number = pagesCount + 1;
                    singlePage.items = [];
                    singlePage.items.push(elements[i]);
                    counter = 1;
                }
            }
        }

        //console.log(pages);

        return pages;
    }

    return {
        getNewsPage
    }

})();

export { news };