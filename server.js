var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var mode = require('./public/temp.json');
app.use(bodyParser());
app.get('/', function (req, res) {
    //    res.sendFile(path.join(__dirname + '/index.html'));
    //    res.render('index',{ title: 'Hey', message: 'Hello there!'});
    //res.send(indexTemplate(req.param("content"), req.param("color")));
    console.log(mode.heat);
    res.send(indexTemplate(mode.heat));
    app.use(express.static(__dirname + '/public'));
});

function indexTemplate(heat) {
    //    return html = '<body style="background-color: ' + bodyBGColor + '">' + bodyContent + '</body>'; 
    var header = `<!DOCTYPE html> <html lang="en"><head><meta name="viewport",content="width=device-width, initial-scale=1.0"><title>Smart Bed</title><link rel="stylesheet" href="css/style.css"></head><body>
    <header><div class="flex-container"><div class="logo"><a href="index.html"> <img src="img/logo.png" alt=""></a></div><div class="name">Super smart bed</div></div></header>`;
    var main = `<main>
        <div class="flex-container">
            <div class="sidebar">
                <ul class="list">
                    <li>Heating
                        <form action="/" method="POST">
                            <select name="heating" id="heating">
                                <option value=1>1</option>
                                <option value=2>2</option>
                                <option value=3>3</option>
                            </select>
                            <button type="submit">Сохранить изменения</button>
                        </form>
                    </li>
                    <li>Фича 2</li>
                    <li>Фича 3</li>
                    <li>Фича 4</li>
                </ul>
            </div>
            <div class="content"> 
                <img class="main_photo" src="img/bed_simple.jpg" alt=""> 
                <img class="heat_photo Op_${heat}" src="img/thermometer.png" alt="">
            </div>
        </div>
    </main>`;
    var footer = `<footer>
        <div class="flex-container"> </div>
    </footer>

    <script src = "js/plugin.js"></script>
</body>

</html>`;
    var res = header + main + footer;
    return res;
}
app.post('/', function (req, res) {
    //    res.send(req.body.heating);
    var saveTemp = {
        heat: req.body.heating
    };

    function saveToPublicFolder(saveTemp) {
        fs.writeFile('./public/temp.json', JSON.stringify(saveTemp));
    }
    var heat = req.body.heating;
    res.send(indexTemplate(heat));
    saveToPublicFolder(saveTemp);
});
/*
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.post('/', function (req, res) {
//           res.send(JSON.stringify(req.body));
    
//    res.send(req.body.heating);
    var heat=req.body.heating;
    res.render('index',{somevar:heat});
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
*/
app.listen(3000, function () {
    console.log('App listening on port 3000!');
});