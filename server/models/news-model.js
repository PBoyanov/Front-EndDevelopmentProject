const modelRegistrator = require('./utils/model-registrator');

module.exports = modelRegistrator.register('News', {
    id: Number,
    heading: String,
    content: String,
    date: Date,
    imgUrl: String,
    comments: []
})