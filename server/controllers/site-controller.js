/* globals module */

/* globals module */

module.exports = function(params) {
    let { data } = params;

    return {
        getAllSites(req, res) {
            data.getAllSites()
                .then(allSites => {
                    //console.log(allNews);
                    res.json({ data: allSites })
                })
                .catch(err => {
                    res.json(err);
                });
        },
        getNewsById(req, res) {
            data.getSiteById(req.params.id)
                .then((site) => {
                    //console.log(news);
                    res.json({ data: site });
                })
                .catch(err => {
                    res.json(err);
                });
        }
    };
};