var mon=require("mongoose");
mon.connect('mongodb://localhost:27017/booksagreegation', { useNewUrlParser: true });
mon.connection.on('error', (err) => {
 console.log(err);
});

var bookSchema = require('./bookSchema');
var authorSchema = require('./authorSchema');


// To match the data of books whose type is comic 
bookSchema.aggregate([{$match : {'bookType': 'Comic'}}, { $group: { _id: '$bookType' } }]).then((data) => {
console.log("Data", data);
}).catch((err) => {
console.log("Got error",err);
})



// To get the data from the table author whose booktype is comic 
bookSchema.aggregate([{$match : {'bookType': 'Comic'}}, {$lookup: { from: 'authors', localField:'bookAuthor', foreignField: '_id', as: 'authorData' } }, { $unwind: '$authorData' } ]).then((data) => {
  console.log("Data", data);
  }).catch((err) => {
  console.log("Got error",err);
  })


// to get the data from books table by matching data by aggregation from authors table
authorSchema.aggregate([{ $lookup: { from: 'books', localField: 'booksDetail.id', foreignField: '_id', as: 'bookData' } }]).then((data) => {
  console.log('Data', data);
}).catch((err) => {
  console.log('Got error', err)
})


//got books which are having the author same as we give in match
authorSchema.aggregate([{ $match: { 'authorName': 'Pinku'} }, { $lookup: { from: 'books', localField: 'booksDetail.id', foreignField: '_id', as: 'bookData' } }])
.then((data) => {console.log("Trin trin data",data)})
.catch((err) => {console.log("Error data",err)});