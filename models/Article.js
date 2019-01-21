const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    userComment: {
        type: Schema.Types.ObjectId,
        ref: `UserComment`
    }
});

const Article = mongoose.model(`Article`, ArticleSchema);

module.exports = Article;