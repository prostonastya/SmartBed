var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

// load index page
app.get('/', function (req, res) {
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
    saveToPublicFolder(req.body);

    function saveToPublicFolder(data) {
        fs.writeFile('./public/temp.json', JSON.stringify(data), function () {
            console.log('Finished');
        });
        res.send(req.body);
    }
    res.end();
});
app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

app.get('/beds', function (req, res) {
    fs.readFile('./public/bedsList.json', 'utf8', (err, data) => {
        if (err) throw err;
        var beds = JSON.parse(data);
        res.send({
            beds: beds
        });
    });
});



// function to write in bedList.json
function saveToBedList(data) {
    fs.writeFile('./public/bedsList.json', JSON.stringify(data), function () {
        console.log('rewrite');
    });        
}


app.post('/beds/create', function (req, res) {
    var bedName = req.body.name;
    

    fs.readFile('./public/bedsList.json', 'utf8', (err, data) => {
        if (err) throw err;
        var beds = JSON.parse(data);
        currentId = beds.length +1;
        beds.push({
            id: currentId,
            name: bedName
            });        
        saveToBedList(beds);
    });        
    res.send('Successfully created bed!');       
});

app.put('/beds/:id', function (req, res) {
    var id = Number(req.params.id);
    var newName = req.body.newName;

    fs.readFile('./public/bedsList.json', 'utf8', (err, data) => {
        if (err) throw err;
        var beds = JSON.parse(data);
        
        beds.forEach(function (bed, index) {
            if (bed.id === id) {
                bed.name = newName;
            }
        });  
        saveToBedList(beds);
    });
    res.send('Succesfully updated bed!');
});

app.delete('/beds/delete/:id', function (req, res) {
    var id = req.params.id;


    fs.readFile('./public/bedsList.json', 'utf8', (err, data) => {
        if (err) throw err;
        var beds = JSON.parse(data);

        beds.forEach(function (bed, index) {
        if (bed.id === Number(id)) {
            beds.splice(index, 1);
        }        
    });
        for (let i = 0; i < beds.length; i++) {
            beds[i].id = i+1;
        }
        saveToBedList(beds);
    });
    res.send('Successfully deleted product!');
});

