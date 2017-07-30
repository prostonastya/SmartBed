
express = require('express');
var app = express();


// app.use(express.static(__dirname + "/public"));

// определяем обработчик для маршрута "/"
app.get('/', function (req, res) {
  
   // отправляем ответ
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});