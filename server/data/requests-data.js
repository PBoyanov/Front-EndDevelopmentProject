/* globals module */

let dataUtils = require('./utils/data-utils');

module.exports = function(models) {
    const REQUEST_STATUS = "visitedRequests.status";
    const NOT_EMPTY = "$gt: []";

    let { User } = models;

    return {
        getRequests() {
            return new Promise((resolve, reject) => {
                User.find({ visitRequests : {$gt: []} /* non empty array*/ }, (err, users) => {
                    if (err) {
                        return reject(err);
                    }

                    if (users) {
                        let requests = [];
                        for (let i = 0; i < users.length; i++) {
                            for (let j = 0; j < users[i].visitRequests.length; j++) {
                                users[i].visitRequests[j].username = users[i].username;
                                requests.push(users[i].visitRequests[j]);
                            }
                        }
                        
                        return resolve(requests);
                    }

                    return reject("no such user");
                });
            });
        }
        // getNewsItemById(id) {
        //     return dataUtils.getOneById(News, id)
        // },
    };
};