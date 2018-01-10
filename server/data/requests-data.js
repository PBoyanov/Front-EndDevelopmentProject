/* globals module */

let dataUtils = require('./utils/data-utils');

module.exports = function (models) {
    const NOT_EMPTY = "$gt: []";

    let { User } = models;

    return {
        getRequests() {
            return new Promise((resolve, reject) => {
                User.find({ visitRequests: { $gt: [] } /* non empty array*/ }, (err, users) => {
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
        },
        requestResponse(requestId, username, newStatus) {
            return new Promise((resolve, reject) => {
                dataUtils.getOneByUsername(User, username)
                    .then((user) => {
                        let targetRequest = user.visitRequests.find(request => request.id === requestId);
                        let targetRequestIndex = user.visitRequests.findIndex(request => request.id === requestId);
                        targetRequest.status = newStatus;
                        user.visitRequests.splice(targetRequestIndex, 1, targetRequest);
                        dataUtils.update(user);
                        return resolve({ targetRequest, username });
                    })
            });
        }
    };
};