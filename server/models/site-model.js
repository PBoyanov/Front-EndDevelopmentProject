const modelRegistrator = require('./utils/model-registrator');

module.exports = modelRegistrator.register('Site', {
    _id: String,
    number: String,
    name: String,
    town: String,
    imgUrl: String,
    description: String,
    numberOfVisits: Number,
    likes: Number,
    comments: []
})