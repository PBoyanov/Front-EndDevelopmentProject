/* globals require module */

const modelRegistrator = require('./utils/model-registrator');

module.exports = modelRegistrator.register('User', {
    username: {
        type: String,
        unique: true
    },
    salt: String,
    hashPass: String,
    firstName: String,
    lastName: String,
    age: Number,
    description: String,
    profileImg: String,
    visitRequests: []
    //visitedSites: []
})