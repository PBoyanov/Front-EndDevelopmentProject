/* globals module */

module.exports = function(params) {
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
        }
    };
};