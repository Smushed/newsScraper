const db = require(`../models`);
const scraper = require(`../handlers/scraper`);

module.exports = app => {
    // Route for posting the comment and then populating the new comment and displaying it to the screen
    app.post(`/article/:id`, async function (req, res) {
        await scraper.postComment(req.body, req.params.id);
        //Tells the webpage that the ajax request is over
        res.end();
    });

    //Goes to https://news.ycombinator.com and scrapes all the articles from the site
    //It checks the database if the article was already in there and does not save them if they are
    app.put("/scrape", async function (req, res) {
        const status = await scraper.scrapeArticles();
        if (status === 200) {
            //Ends the Ajax request, which then goes to the front end and reloads the websit to get the scraped articles to show
            res.end();
        };
    });

}