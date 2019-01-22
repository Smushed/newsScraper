// Require all models
const db = require(`../models`);

// Scraping tools
const axios = require(`axios`);
const cheerio = require(`cheerio`);

module.exports = {
    getScrapedData: async () => {
        const articles = await db.Article.find({});
        return articles
    },
    scrapeArticles: async () => {

        const response = await axios.get(`https://news.ycombinator.com/`);
        const $ = cheerio.load(response.data);
        const articleArray = [];

        //Goes through all the links with the class of storylink and adds them all to an array
        await $(`a.storylink`).each(function (i, element) {
            const result = {};
            result.title = $(element).text();
            result.link = $(element).attr("href");
            articleArray.push(result);
        });

        //Must be a for loop to make the code become synchronous while logging to the database
        //Not sure if it's better to query the database for each article or to grab all articles then run a loop to check for duplicates
        for (const article of articleArray) {
            const foundArticle = await db.Article.findOne({ title: article.title })
            if (!foundArticle) {
                await db.Article.create(article, (err, data) => { console.log("Article Added") });
            }
        }

        return 200
    },
    postComment: async (newComment, articleId) => {
        try {
            // Create a new note and pass the req.body to the entry
            const newUserComment = await db.UserComment.create(newComment);
            const updatedArticle = await db.Article.findOneAndUpdate({ _id: articleId }, { userComment: newUserComment._id });
            return updatedArticle;
        } catch (err) {
            return 500;
        }
    },
    deleteAllArticles: async () => {
        let status = 0;
        await db.Article.remove({}, function (err) {
            if (err) {
                status = 500;
            } else {
                status = 200;
            };
        });
        return status
    },
    deleteSingleArticle: async (articleId) => {
        let status = 0;
        await db.Article.deleteOne({ _id: articleId }, function (err) {
            if (err) {
                status = 500;
            } else {
                status = 200;
            };
        });
        return status;
    }
};