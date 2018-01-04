/* globals module */
let dataUtils = require('./utils/data-utils');

module.exports = function (models, validator) {
    let { User } = models;

    return {
        createUser(user) {
            return new Promise((resolve, reject) => {
                let newUser = new User({
                    username: user.username,
                    salt: user.salt,
                    hashPass: user.hashPass,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    description: user.description,
                    profileImg: user.profileImg,
                    roles: user.roles,
                    visitRequests: user.visitRequests,
                    visitedSites: user.visitedSites
                });

                resolve(newUser);
            })
                .then((newUser) => {
                    return dataUtils.save(newUser);
                })
        },
        findUserById(id) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    if (user) {
                        return resolve(user);
                    }

                    return reject("no such user");
                });
            });
        },
        findUserByCredentials(username, hashPass) {
            return new Promise((resolve, reject) => {
                User.findOne({ username, hashPass }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(user);
                });
            });
        },
        getUserByUsername(username) {
            return dataUtils.getOneByUsername(User, username);
        },
        getUserProfile(username) {
            return new Promise((resolve, reject) => {
                dataUtils.getOneByUsername(User, username)
                    .then((user) => {
                        let userToReturn = {
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            age: user.age,
                            description: user.description,
                            profileImg: user.profileImg,
                            visitedSites: user.visitedSites
                        }

                        return resolve(userToReturn);
                    });
            });
        },
        addVisitRequest(username, visitRequest) {
            return new Promise((resolve, reject) => {
                dataUtils.getOneByUsername(User, username)
                    .then((user) => {
                        user.visitRequests.push(visitRequest);
                        dataUtils.update(user);
                        return resolve(user.visitRequests);
                    });
            });
        },
        getUserVisitedSites(username) {
            return new Promise((resolve, reject) => {
                dataUtils.getOneByUsername(User, username)
                    .then((user) => {
                        let visitRequests = [];
                        
                        for (let i = 0; i < user.visitRequests.length; i++) {
                            let currentRequest = user.visitRequests[i];

                            let request = {};
                            request.siteId = currentRequest.siteId;
                            request.status = currentRequest.status;

                            visitRequests.push(request);
                        }

                        return resolve(visitRequests);
                    });
            });
        },
        markSiteAsVisited(username, site) {
            return new Promise((resolve, reject) => {
                dataUtils.getOneByUsername(User, username)
                    .then((user) => {
                        let siteData = {
                            number: site.number,
                            name: site.name,
                            town: site.town
                        };

                        user.visitedSites.push(siteData);
                        dataUtils.update(user);
                        return resolve(user.visitedSites);
                    });
            });
        },
        unmarkSiteAsVisited(username, site) {
            return new Promise((resolve, reject) => {
                dataUtils.getOneByUsername(User, username)
                    .then((user) => {
                        let siteNumber = site.number;
                        for (let i = 0; i < user.visitedSites.length; i++) {
                            let site = user.visitedSites[i];

                            if (site.number === siteNumber) {
                                user.visitedSites.splice(i, 1);
                            }
                        }

                        dataUtils.update(user);
                        return resolve(user.visitedSites);
                    });
            });
        }
    };
};