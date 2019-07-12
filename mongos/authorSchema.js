var mon=require("mongoose");
// mon.connect('mongodb://localhost:27017/agreegationDemo', { useNewUrlParser: true });

var authorStructure = new mon.Schema({
  authorName: String,
  authorGender: String,
  authorCity: String, 
  booksDetail: {
    type: mon.Schema.Types.ObjectId,
    ref: 'books'
  }
});

var authorSchema = mon.model('authors', authorStructure);

module.exports = authorSchema;