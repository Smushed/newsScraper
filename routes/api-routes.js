const db = require(`../models`);
const scraper = require(`../handlers/scraper`);

module.exports = app => {
    // Route for posting the comment and then populating the new comment and displaying it to the screen
    app.post(`/article/:id`, async (req, res) => {
        const status = await scraper.postComment(req.body, req.params.id);
        //Tells the webpage that the ajax request is over
        if (status === 500) {
            res.render(`error`);
        } else {
            res.end();
        };
    });

    //Goes to https://news.ycombinator.com and scrapes all the articles from the site
    //It checks the database if the article was already in there and does not save them if they are
    app.put("/scrape", async (req, res) => {
        const status = await scraper.scrapeArticles();
        if (status === 200) {
            //Ends the Ajax request, which then goes to the front end and reloads the websit to get the scraped articles to show
            res.end();
        } else {
            res.render(`error`);
        };
    });

    //Plural here as we are going to delete all the articles
    app.delete(`/articles`, async (req, res) => {
        const status = await scraper.deleteAllArticles();
        console.log(status)
        if (status === 200) {
            res.end();
        } else {
            res.render(`error`);
        };
    });

    //Plural here as we are going to delete all the articles
    app.delete(`/article/:id`, async (req, res) => {
        const articleId = req.params.id;
        const status = await scraper.deleteSingleArticle(articleId);
        console.log(status)
        if (status === 200) {
            res.end();
        } else {
            res.render(`error`);
        };
    });
}