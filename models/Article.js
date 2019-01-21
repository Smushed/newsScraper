var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
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
        ref: "UserComment"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;