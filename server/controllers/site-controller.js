/* globals module */

module.exports = function (params) {
    let { data } = params;

    return {
        getAllSites(req, res) {
            data.getAllSites()
                .then(allSites => {
                    res.json({ data: allSites })
                })
                .catch(err => {
                    res.json(err);
                });
        },
        getSiteById(req, res) {
            data.getSiteById(req.params.id)
                .then((site) => {
                    res.json({ data: site });
                })
                .catch(err => {
                    res.json(err);
                });
        },
        markSiteAsVisited(req, res) {
            let putData = req.body;
            let siteId = putData.siteId;
            let username = putData.username;

            data.incrementSiteVisits(siteId)
                .then((site) => {
                    data.markSiteAsVisited(username, site)
                        .then((visitedSites) => {
                            res.status(200).send({ success: true, visitedSites });
                        })
                        .catch(err => {
                            res.json(err);
                        });
                })
                .catch(err => {
                    res.json(err);
                });
        }
    };
};