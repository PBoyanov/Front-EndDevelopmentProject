/* globals module */
let dataUtils = require('./utils/data-utils');

module.exports = function(models) {
    let { Site } = models;

    return {
        getAllSites() {
            return dataUtils.getAll(Site);
        },
        getSiteById(id) {
            return dataUtils.getOneById(Site, id)
        }
    };
};