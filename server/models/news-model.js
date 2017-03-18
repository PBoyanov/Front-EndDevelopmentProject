const modelRegistrator = require('./utils/model-registrator');

module.exports = modelRegistrator.register('News', {
    _id: String,
    heading: String,
    content: String,
    date: Date,
    imgUrl: String,
    comments: []
})