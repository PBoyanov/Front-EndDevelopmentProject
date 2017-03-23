/* globals module */
let dataUtils = require('./utils/data-utils');

module.exports = function (models) {
    let { Site } = models;

    return {
        getAllSites() {
            return dataUtils.getAll(Site);
        },
        getSiteById(id) {
            return dataUtils.getOneById(Site, id)
        },
        incrementSiteVisits(id) {
            return new Promise((resolve, reject) => {
                dataUtils.getOneById(Site, id)
                .then((site) => {
                    site.numberOfVisits++;
                    dataUtils.update(site);
                    return resolve(site);
                });
            });
        },
        decrementSiteVisits(id) {
            return new Promise((resolve, reject) => {
                dataUtils.getOneById(Site, id)
                .then((site) => {
                    site.numberOfVisits--;
                    dataUtils.update(site);
                    return resolve(site);
                });
            });
        }
    };
};