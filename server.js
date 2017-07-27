'use strict';
var fs = require("fs");
var index = fs.readFileSync('./index.html');
var http = require("http");

function start() {
    function onRequest(request, response) {
        console.log("Request received.");
        response.writeHead(200, {
            'Content-Type': 'text/html; charset=utf8'
        });
        response.write("Hello World");
        response.end(index);
    }
    http.createServer(onRequest).listen(9000);
    console.log("Server has started.");
}
exports.start = start;