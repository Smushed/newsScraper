const db = require(`../models`);
const scraper = require(`../handlers/scraper`);

module.exports = app => {
    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", async function (req, res) {
        const singleArticle = await scraper.postComment(req.body);
        res.render(`singleArticle`, { singleArticle });
    });


    // A GET route for scraping the echoJS website
    app.get("/scrape", function (req, res) {
        if (scraper.scrapeArticles() == 200) {
            res.redirect(`/`)
        }
    });

}