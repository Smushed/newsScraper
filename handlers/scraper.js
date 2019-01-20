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
    postComment: async (newComment) => {

    }
};