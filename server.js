'use strict';
var fs = require('fs');
// var index = fs.readFileSync('./index.html');
var http = require('http');
var path = require('path')

function start() {
    function onRequest(request, response) {
        console.log("Request received.");
        
        var filePath = '.' + request.url;
        if (filePath == './')
        filePath = './index.html';

        var extname = path.extname(filePath);
        var contentType = 'text/html';
        switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        }


        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    response.end(); 
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    };


    //     response.writeHead(200, {
    //         'Content-Type': 'text/html; charset=utf8'
    //     });
    //     response.write(index);
    //     response.end();
    // }
    http.createServer(onRequest).listen(9000);
    console.log("Server has started.");
}
exports.start = start;