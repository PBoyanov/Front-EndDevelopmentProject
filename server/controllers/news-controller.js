/* globals module */

module.exports = function(params) {
    let { data } = params;

    return {
        getAllNews(req, res) {
            data.getAllNews()
                .then(allNews => {
                    res.json({ data: allNews })
                })
                .catch(err => {
                    res.json(err);
                });
        },
        getNewsItemById(req, res) {
            data.getNewsItemById(req.params.id)
                .then((newsItem) => {
                    res.json({ data: newsItem });
                })
                .catch(err => {
                    res.json(err);
                });
        }
    };
};