import { templateLoader } from './template-loader';
import { data } from './data';

let news = (() => {
    let templateItems = {};
    const NEWS_ON_PAGE = 5;
    const COMMENTS_ON_PAGE = 4;

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

                $("#pagination").twbsPagination({
                    totalPages: newsPagesCount,
                    visiblePages: 5,
                    first: "<<",
                    startPage: 1,
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

    function getNewsItemDetailsPage(context) {
        let templateItems = {};
        let newsItemId = context.params["id"];

        Promise.all([data.getNewsItemById(newsItemId), data.isLoggedIn(), templateLoader.get("news-item-details")])
            .then(([serverResponseNewsItem, loggedUser, template]) => {
                let newsItem = serverResponseNewsItem.data;
                countComments(newsItem);
                templateItems.isSingleComment = (newsItem.comments.length === 1);
                processComments(newsItem.comments);
                newsItem.commentsPages = createPages(newsItem.comments, COMMENTS_ON_PAGE);
                let commentsPagesCount = newsItem.commentsPages.length;

                templateItems.newsItem = newsItem;

                templateItems.isLoggedIn = !!(loggedUser.username);

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

                $("#post-comment").on("click", function () {
                    let commentContent = $("#comment").val();
                    if (commentContent.length === 0) {
                        toastr.error("Коментарът не може да бъде празен!");
                    } else {
                        let newsItemId = newsItem.id;
                        let date = new Date();
                        let username = loggedUser.username;
                        data.addNewsItemComment(newsItemId, commentContent, date, username);
                        document.location.reload(true);
                    }
                });

                $("#pagination").twbsPagination({
                    totalPages: commentsPagesCount,
                    visiblePages: 5,
                    startPage: 1,
                    first: "<<",
                    prev: "<",
                    next: ">",
                    last: ">>",
                    onPageClick: function (event, page) {
                        let currentPage = $("#comments").find(".comment-page:not(.hidden)");
                        currentPage.addClass("hidden");
                        let visiblePage = $('#comments').find(`#comment-page-${page}`);
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

        news.sort(sortItemsByDate);

        for (let newsItem of news) {
            newsItem.date = formatDate(newsItem.date);
        }
    }

    function sortItemsByDate(a, b) {
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

    function countComments(newsItem) {
        newsItem.commentsCount = newsItem.comments.length;
    }

    function processComments(commentsArr) {
        for (let comment of commentsArr) {
            comment.date = new Date(comment.date);
        }

        commentsArr.sort(sortItemsByDate);

        for (let comment of commentsArr) {
            comment.date = formatDate(comment.date);
        }
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
        getNewsPage,
        getNewsItemDetailsPage
    }

})();

export { news };