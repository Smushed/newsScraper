// When you click the savenote button
$(`.write-comment`).on(`click`, function () {
    // Grab the id associated with the article from the submit button
    const thisId = $(this).attr(`data-id`);

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: `POST`,
        url: `/articles/${thisId}`,
        data: {
            // Value taken from title input
            name: $(`.name`).val(),
            // Value taken from note textarea
            body: $(`.userComment`).val()
        }
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $(`#notes`).empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $(`.name`).val(``);
    $(`.userComment`).val(``);
});
