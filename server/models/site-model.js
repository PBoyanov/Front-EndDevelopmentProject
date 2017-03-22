const modelRegistrator = require('./utils/model-registrator');

module.exports = modelRegistrator.register('Site', {
    id: Number,
    number: String,
    name: String,
    town: String,
    imgUrl: String,
    description: String,
    numberOfVisits: Number,
    likes: Number,
    comments: []
})