// Require all models
const db = require(`../models`);

// Scraping tools
const axios = require(`axios`);
const cheerio = require(`cheerio`);

module.exports = {
    getScrapedData: async () => {
        const articles = await db.Article.find({});
        return await articles
    },
    scrapeArticles: async () => {

        const response = await axios.get("https://news.ycombinator.com/");
        const $ = cheerio.load(response.data);

        $("a.storylink").each(async function (i, element) {
            const result = {};

            result.title = $(element).text();
            result.link = $(element).attr("href");

            // Save these results in an object that we'll push into the results array we defined earlier
            db.Article.create(result, (err, data) => { console.log(data) });
        });
        return 200;
    },
    postComment: async (newComment, articleId) => {
        // Create a new note and pass the req.body to the entry
        db.UserComment.create(newComment)
            .then(function (dbUserComment) {
                // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
                // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                db.Article.findOneAndUpdate({ _id: articleId }, { userComment: dbUserComment._id }, { new: true });
            })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                return dbArticle;
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    }
};