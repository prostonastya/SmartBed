var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser());

app.get('/', function (req, res) {   
   
    var mode = JSON.parse(fs.readFileSync('./public/temp.json', 'utf8'));
    res.send(indexTemplate(mode.heat)); 
    app.use(express.static(__dirname + '/public'));
});

function indexTemplate(heat) {
 
    var header = `<!DOCTYPE html> <html lang="en"><head><meta name="viewport",content="width=device-width, initial-scale=1.0"><title>Smart Bed</title><link rel="stylesheet" href="css/style.css"></head><body>
    <header><div class="flex-container"><div class="logo"><a href="index.html"> <img src="img/logo.png" alt=""></a></div><div class="name">Super smart bed</div></div></header>`;
    var modes=['cool','middle','hot'];
    var select='';
        for(let i = 1;i<=3;i++){
        
            if(i==heat){
       select += `<option value=${i} selected>${modes[i-1]}</option>`;
            }
            else{
                select += `<option value=${i}>${modes[i-1]}</option>`;
            }
    }
    
    var main = `<main>
        <div class="flex-container">
            <div class="sidebar">
                <ul class="list">
                    <li>Change the temperature mode
                        <form action="/" method="POST">
                            <select name="heating" id="heating"> 
                                ${select}                               
                            </select>
                            <button>Save Changes</button>
                        </form>
                    </li>
                    <li>Фича 2</li>
                    <li>Фича 3</li>
                    <li>Фича 4</li>
                </ul>
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

app.post('/', function (req, res) {
  
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

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});