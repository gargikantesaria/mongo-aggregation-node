
var http = require('http');
var exp = require('express'); 
var bodyParser = require("body-parser");
var app = exp();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use((req,res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS,PATCH');
  res.setHeader('Access-Control-Allow-Headers','X-Requested-With,authtoken,isadmintoken,Accept,Content-Type,Authorization')
  // Pass to next layer of middleware
  next();
});

// app.use('/api', require('./mongos/aggregation'));
var agg = require('./mongos/aggregation');

var server = http.createServer(app);
server.listen(4000, () => {
  console.log("server started");
})