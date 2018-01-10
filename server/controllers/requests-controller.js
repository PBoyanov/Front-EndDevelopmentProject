/* globals module */

module.exports = function (params) {
    const VISIT_REQUEST_STATUSES = [
        "PENDING",
        "APPROVED",
        "IGNORED"
    ];
    const RESPONSE_TYPES = [
        "APPROVE",
        "IGNORE"
    ];
    let { data } = params;

    return {
        getRequests(req, res) {
            data.getRequests()
                .then(requests => {
                    res.json({ data: requests })
                })
                .catch(err => {
                    res.json(err);
                });
        },
        requestResponse(req, res) {
            let requestId = req.params.id;
            let putData = req.body;
            let username = putData.username;
            let responseType = putData.responseType;

            let newStatus;
            if (responseType === RESPONSE_TYPES[0]) {
                newStatus = VISIT_REQUEST_STATUSES[1];
            }
            if (responseType === RESPONSE_TYPES[1]) {
                newStatus = VISIT_REQUEST_STATUSES[2];
            }

            data.requestResponse(requestId, username, newStatus)
                .then(responseObj => {
                    if (newStatus === VISIT_REQUEST_STATUSES[1]) {
                        let targetRequest = responseObj.targetRequest;
                        let username = responseObj.username;

                        data.getSiteById(targetRequest.siteId)
                            .then((site) => {
                                data.markSiteAsVisited(username, site)
                                    .then((visitedSites) => {
                                        res.status(200).send({ success: true, msg: "Успешно обновихте статус на заявка с id: " + requestId });
                                    });
                            });
                    } else {
                        res.status(200).send({ success: true, msg: "Успешно обновихте статус на заявка с id: " + requestId });
                    }

                })
                .catch(err => {
                    res.json(err);
                });
        }
    };
};