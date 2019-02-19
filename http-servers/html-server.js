let fileSystem = require('fs');
let http = require('http');
const ReplaceStream = require('./transformStreams/replace-text');

http.createServer(function (request, response) {
    let filePath = ('../index.html');
    let readStream = fileSystem.createReadStream(filePath);

    const replaceStream = new ReplaceStream({
        message: 'Hello, World!'
    });

    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    readStream
       .pipe(replaceStream)
       .pipe(response);

}).listen(8080); //the server object listens on port 8080
