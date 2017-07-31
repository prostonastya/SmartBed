var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser());

app.get('/', function (req, res) {
//    res.sendFile(path.join(__dirname + '/index.html'));
  
    res.render('index',{ title: 'Hey', message: 'Hello there!'});
    app.use(express.static(__dirname + '/public')); 
});



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.post('/', function (req, res) {
//           res.send(JSON.stringify(req.body));
    
    res.send(req.body.heating);
//    var heating=req.body.heating;
});

//app.get('/', function (req, res) {
//  res.render('index', { title: 'Hey', message: 'Hello there!'});
//});

//app.post('/', function (req, res) {
//    console.dir(req.body);
//    //    res.send(JSON.stringify(req.body));
//    res.send(req.body);
//});






app.listen(3000, function () {
    console.log('App listening on port 3000!');
});