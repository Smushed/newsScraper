// When you click the savenote button
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
            //Refreshes the page once the ajax request is complete so the comment is diaplayed
            location.reload();
        });
});
