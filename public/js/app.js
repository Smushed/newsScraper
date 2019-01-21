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
