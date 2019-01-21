const mongoose = require(`mongoose`);

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
const UserCommentSchema = new Schema({
    name: String,
    body: String
});

// This creates our model from the above schema, using mongoose's model method
const UserComment = mongoose.model(`UserComment`, UserCommentSchema);

// Export the Note model
module.exports = UserComment;
