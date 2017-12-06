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
            let siteId = req.params.id;
            data.getSiteById(siteId)
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
            let isReverse = putData.isReverse;

            if (!isReverse) {
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
            } else {
                data.decrementSiteVisits(siteId)
                    .then((site) => {
                        data.unmarkSiteAsVisited(username, site)
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
        },
        addSiteComment(req, res) {
            let siteId = req.params.id;
            let putData = req.body;
            let username = putData.username;

            data.getUserByUsername(username)
                .then((user) => {
                    let comment = {
                        content: putData.commentContent,
                        date: putData.commentDate,
                        username: username,
                        userProfileImg: user.profileImg
                    }

                    data.addSiteComment(siteId, comment)
                        .then((site) => {
                            res.status(200).send({ success: true, msg: "Успешно добавен коментар" });
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