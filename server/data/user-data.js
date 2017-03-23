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
                    profileImg: user.profileImg,
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