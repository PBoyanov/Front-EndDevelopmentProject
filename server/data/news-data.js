/* globals module */
let dataUtils = require('./utils/data-utils');

module.exports = function(models) {
    let { News } = models;

    return {
        getAllNews() {
            return dataUtils.getAll(News);
        },
        getNewsItemById(id) {
            return dataUtils.getOneById(News, id)
        },
        addNewsItemComment(id, comment) {
            return new Promise((resolve, reject) => {
                dataUtils.getOneById(News, id)
                .then((newsItem) => {
                    newsItem.comments.push(comment);
                    dataUtils.update(newsItem);
                    return resolve(newsItem);
                });
            });
        }
    };
};