import { templateLoader } from "./template-loader";
import { data } from "./data";

let requests = (() => {
    const IMAGE_SOURCE_BEGINNING = "data:image/jpeg;base64,";
    const VISIT_REQUEST_STATUSES = [
        "PENDING",
        "APPROVED",
        "IGNORED"
    ];
    const RESPONSE_TYPES = [
        "APPROVE",
        "IGNORE"
    ];
    const ORDER_BY_VALUES = {
        date: "date",
        number: "number"
    };
    let templateItems = {};

    function getRequestsPage(context) {
        Promise.all([data.getVisitRequests(), templateLoader.get("visit-requests")])
            .then(([serverResponseRequests, template]) => {
                let requests = serverResponseRequests.data;

                if (context.params["status"]) {
                    let status = context.params["status"];
                    if (!(status === "ALL")) {
                        requests = requests.filter(request => request.status === status);
                    }
                    templateItems.filteredOnThis = status;
                    templateItems.requestsCount = requests.length;
                    templateItems.isSingleRequest = (requests.length === 1);
                }

                //default orderBy
                templateItems.orderByDate = true;
                templateItems.orderByNumber = false;
                let orderBy;
                if (context.params["orderby"]) {
                    orderBy = context.params["orderby"];
                    if (orderBy === ORDER_BY_VALUES.number) {
                        templateItems.orderByDate = false;
                        templateItems.orderByNumber = true;
                    }
                }

                processRequestsData(requests, orderBy);
                templateItems.requests = requests;

                let pageHtml = template(templateItems);
                context.$element().html(pageHtml);

                $("#filter-by-status .dropdown-item").on("click", function () {
                    context.path = context.path.replace("&", "");

                    let statusUrlPartIndex = context.path.indexOf("status");
                    let orderByUrlPartIndex = context.path.indexOf("orderby");
                    let orderByPart = context.path.slice(orderByUrlPartIndex);
                    let urlBase = context.path.slice(0, statusUrlPartIndex);

                    let dropdownItem = $(this);
                    let filterOnThis = dropdownItem.text();

                    context.redirect(`${urlBase}status=${filterOnThis}&${orderByPart}`);
                });

                $("#order-by .order-btn:not(.active)").on("click", function (event) {
                    context.path = context.path.replace("&", "");

                    let orderByUrlPartIndex = context.path.indexOf("orderby");
                    let urlBase = context.path.slice(0, orderByUrlPartIndex);

                    let orderByThis = event.target.id;

                    context.redirect(`${urlBase}&orderby=${orderByThis}`);
                });

                $(".request").hover(
                    function mouseIn() {
                        let requestWrap = $(this).find(".request-wrap");
                        requestWrap.addClass("hover");
                    },
                    function mouseOut() {
                        let requestWrap = $(this).find(".request-wrap");
                        requestWrap.removeClass("hover");
                    }
                );

                $("#requests-list").on("click", ".request", function (event) {
                    let previousActiveItem = $("#requests-list").find(".active");
                    let requestWrap;

                    let target = $(event.target);
                    if (target.hasClass("request-wrap")) {
                        requestWrap = target;
                    } else {
                        requestWrap = target.parentsUntil(".request", ".request-wrap");
                    }

                    if (!requestWrap.hasClass("active")) {
                        previousActiveItem.removeClass("active");
                        requestWrap.addClass("active");
                    } else {
                        requestWrap.removeClass("active");
                    }
                });

                $("[data-fancybox]").fancybox({
                    buttons: [
                        'fullScreen',
                        //'zoom',
                        'close'
                    ]
                });

                $(".response-btn").on("click", function (event) {
                    let target = $(event.target)
                    let responseType = (target.hasClass("approve-btn") ?
                        RESPONSE_TYPES[0] : RESPONSE_TYPES[1]);

                    let requestListItem = target.parentsUntil("#requests-list", ".request");
                    let requestId = requestListItem.attr("id");

                    let requestBottomRow = target.parentsUntil(".request-right-wrap", ".request-bottom-row");
                    let profileLink = requestBottomRow.find(".profile-link");
                    let username = profileLink.text();

                    data.requestResponse(requestId, username, responseType);
                    document.location.reload(true);
                });


            });
    }

    function processRequestsData(requests, orderBy) {
        if (orderBy === ORDER_BY_VALUES.date) {
            requests.sort(sortRequestsByDate);
        } else if (orderBy === ORDER_BY_VALUES.number) {
            requests.sort(sortRequestsByNumber);
        } else {
            requests.sort(sortSitesByDate);
        }

        for (let request of requests) {
            request.fileStr = IMAGE_SOURCE_BEGINNING + request.fileStr;
            let date = new Date(request.date);
            request.date = formatDate(date);
            request.isPending = false;
            if (request.status === VISIT_REQUEST_STATUSES[0]) {
                request.isPending = true;
            }
        }
    }

    function formatDate(date) {
        let day = date.getDate();
        let monthIndex = date.getMonth();
        let month = monthIndex + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();

        return hour + ":" + minute + " " + day + "/" + month + "/" + year;
    }

    function sortRequestsByNumber(a, b) {
        return a.siteId - b.siteId;
    }

    function sortRequestsByDate(a, b) {
        return b.date - a.date;
    }

    return {
        getRequestsPage
    }

})();

export { requests };