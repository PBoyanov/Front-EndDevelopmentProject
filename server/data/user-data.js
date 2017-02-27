/* globals module */
let dataUtils = require('./utils/data-utils');

module.exports = function(models, validator) {
    let { User } = models;

    return {
        createUser(user) {
            return new Promise((resolve, reject) => {

                    let newUser = new User({
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        profileImgURL: user.profileImgURL,
                        email: user.email,
                        hashPass: user.hashPass,
                        salt: user.salt,
                        recipes: user.recipes,
                        forumPoints: user.forumPoints,
                        isAdmin: user.isAdmin
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
            return new Promise((resolve, reject) => {
                User.findOne({ username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
    };
};