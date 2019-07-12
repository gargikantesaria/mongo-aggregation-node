var mon=require("mongoose");

var bookStructure = new mon.Schema({
  bookName: String,
  bookType: String,
  bookAuthor: {
    type: mon.Schema.Types.ObjectId,
    ref: 'authors'
  }, 
});

var bookSchema = mon.model('books', bookStructure);

module.exports = bookSchema;