//Scrape articles button
$(`.scrape-articles`).on(`click`, function () {
    $.ajax({
        method: `PUT`,
        url: `/scrape`
    }).then(() => {
        //Refreshes the page once the ajax request is complete so the new articles are displayed
        location.reload();
    })
});

//Plural as to delete all the articls in the database
//If was for mroe than homework I would probably rename this
$(`.delete-articles`).on(`click`, () => {
    $.ajax({
        method: `DELETE`,
        url: `/articles` //Plural as we are going to delete all the articles
    }).then(() => {
        location.reload();
    });
});

$(`.delete-single-article`).on(`click`, function () {
    const articleId = $(this).attr(`data-id`);
    $.ajax({
        method: `DELETE`,
        url: `/article/${articleId}`
    }).then(() => {
        window.location.href = `/`; //No location.reload this time as we are going back to the homepage after deleting this article
    });
});

// When you click the write comment button
// Each article can have one comment on each
$(`.write-comment`).on(`click`, function () {
    // Grab the id associated with the article from the submit button
    const thisId = $(this).attr(`data-id`);

    // Run a POST request to change the comment using the article ID
    $.ajax({
        method: `POST`,
        url: `/article/${thisId}`,
        data: {
            // Value taken from title input
            name: $(`.name`).val(),
            // Value taken from note textarea
            body: $(`.userComment`).val()
        }
    })
        .then(() => {
            //Refreshes the page once the ajax request is complete so the comment is displayed
            location.reload();
        });
});
