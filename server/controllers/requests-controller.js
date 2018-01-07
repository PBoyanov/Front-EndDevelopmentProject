/* globals module */

module.exports = function(params) {
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
        }
    };
};