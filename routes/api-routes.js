const db = require(`../models`);
const scraper = require(`../handlers/scraper`);

module.exports = app => {
    // Route for posting the comment and then populating the new comment and displaying it to the screen
    app.post(`/article/:id`, async function (req, res) {
        await scraper.postComment(req.body, req.params.id);
        //Tells the webpage that the ajax request is over
        res.end();
    });


    // A GET route for scraping the echoJS website
    app.get("/scrape", function (req, res) {
        if (scraper.scrapeArticles() == 200) {
            res.redirect(`/`)
        }
    });

}