var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var currentId = 2;
//var beds = [
//    {
//        id: 1
//        , name: 'red bed'
//}
//    , {
//        id: 2
//        , name: 'white bed'
//}
//];
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
// load index page
app.get('/', function (req, res) {
    //  var mode = JSON.parse(fs.readFileSync('./public/temp.json', 'utf8'));
    //    res.send(indexTemplate(mode.heat)); 
    //});
    var mode;
    fs.readFile('./public/temp.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.send(indexTemplate(JSON.parse(data).heat));
    });
});

function indexTemplate(heat) {
    var header = `<!DOCTYPE html> <html lang="en"><head><meta name="viewport",content="width=device-width, initial-scale=1.0"><title>Smart Bed</title><link rel="stylesheet" href="css/style.css"></head><body>
    <header><div class="flex-container"><div class="logo"><a href="index.html"> <img src="img/logo.png" alt=""></a></div><div class="name">Super smart bed</div></div></header>`;
    var modes = ['cool', 'middle', 'hot'];
    var select = '';
    for (let i = 1; i <= 3; i++) {
        if (i == heat) {
            select += `<option value=${i} selected>${modes[i-1]}</option>`;
        }
        else {
            select += `<option value=${i}>${modes[i-1]}</option>`;
        }
    }
    var main = `<main>
        <div class="flex-container">
            <div class="sidebar">
                <ul class="list">
                    <li>Change the temperature mode
                        <form action="/mode" method="POST">
                            <select name="heating" id="heating"> 
                                ${select}                               
                            </select>
                            <input type="button" value="Save Changes" id="SaveTemp">
                        </form>
                    </li>                    
                </ul>
                <button id="get-button">GET all beds</button>
                <form id="create-form">
                    <input type="text" id="create-input">
                    <button id= "create">Create new bed</button>
                </form>                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="content"> 
                <img class="main_photo" src="img/bed_simple.png" alt=""> 
                <div class="term Op-${heat}"></div>               
            </div>
        </div>
    </main>`;
    var footer = `<footer>
        <div class="flex-container">         
        </div>
    </footer>
    <script src = "js/plugin.js"></script>
    </body>
    </html>`;
    var res = header + main + footer;
    return res;
}
app.post('/mode', (req, res) => {
    console.log(req.body);
    console.log(req.body.heat);
    saveToPublicFolder(req.body);

    function saveToPublicFolder(data) {
        fs.writeFile('./public/temp.json', JSON.stringify(data), function () {
            console.log('Finished');
        });
        res.send(req.body);
        //        console.log(req.body)
    }
    res.end();
});
app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
//var readBedsList = function () {
//    var res;
//    fs.readFile('./public/bedsList.json', 'utf8', (err, data) => {
//        if (err) throw err;
//        res = JSON.parse(data);
//    });
//    console.log(res);
//    //return res;
//};
app.get('/beds', function (req, res) {
    //    fs.readFile('./public/temp.json', 'utf8', (err, data) => {
    //        if (err) throw err;
    //        res.send(indexTemplate(JSON.parse(data).heat));
    //    });
    fs.readFile('./public/bedsList.json', 'utf8', (err, data) => {
        if (err) throw err;
        var beds = JSON.parse(data);
        res.send({
            beds: beds
        });
    });
});
app.post('/beds/create', function (req, res) {
    var bedName = req.body.name;
    currentId++;
    beds.push({
        id: currentId
        , name: bedName
    });
    res.send('Successfully created bed!');
});
app.put('/beds/:id', function (req, res) {
    var id = Number(req.params.id);
    var newName = req.body.newName;
    beds.forEach(function (bed, index) {
        if (bed.id === id) {
            bed.name = newName;
        }
    });
    res.send('Succesfully updated bed!');
});
app.delete('/beds/delete/:id', function (req, res) {
    var id = req.params.id;
    beds.forEach(function (bed, index) {
        if (bed.id === Number(id)) {
            beds.splice(index, 1);
        }
    });
    res.send('Successfully deleted product!');
});