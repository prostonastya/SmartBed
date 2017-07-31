var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser());
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    app.use(express.static(__dirname + '/public'));
    // app.use(express.static(__dirname));
});
app.post('/', function (req, res) {
    //    res.send(JSON.stringify(req.body));
    res.send(req.body.mode);
});
app.listen(3000, function () {
    console.log('App listening on port 3000!');
});