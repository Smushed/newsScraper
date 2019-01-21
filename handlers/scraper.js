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

        await Promise.all($("a.storylink").each(async function (i, element) {
            const result = {};

            result.title = $(element).text();
            result.link = $(element).attr("href");

            // Check to see if the article is already in the database
            // If not save it into the database
            const foundArticle = await db.Article.findOne({ title: result.title })
            if (!foundArticle) {
                await db.Article.create(result, (err, data) => { console.log(data) });
            }
        }));
        return 200;
    },
    postComment: async (newComment, articleId) => {
        // Create a new note and pass the req.body to the entry
        const newUserComment = await db.UserComment.create(newComment);
        const updatedArticle = await db.Article.findOneAndUpdate({ _id: articleId }, { userComment: newUserComment._id });
        return updatedArticle;
    }
};