const scraper = require(`../handlers/scraper`);
var db = require(`../models`);

module.exports = app => {
    //Gets the page to load and queries the database to get the burgers to display
    app.get(`/`, async (req, res) => {
        try {
            const data = await scraper.getScrapedData();
            res.render(`index`, { data });
        } catch (err) {
            res.json(err)
        }
    });

    // Route for grabbing a specific Article by id, populate it with its note
    app.get(`/article/:id`, async (req, res) => {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db and populate all of the notes associated with it
        const singleArticle = await db.Article.findOne({ _id: req.params.id }).populate(`userComment`);
        res.render(`singleArticle`, { singleArticle });
    });

    // Route for getting all Articles from the db
    app.get(`/articles`, function (req, res) {
        // Grab every document in the Articles collection
        db.Article.find({})
            .then(function (dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });
};