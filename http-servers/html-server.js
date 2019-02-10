let fileSystem = require('fs');
let http = require('http');

http.createServer(function (request, response) {
    let filePath = ('../index.html');

    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

    let readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(response);

    // fileSystem.readFile(filePath, null, function(error, data) {
    //     if (error) {
    //         response.writeHead(404);
    //         response.write('Not found.')
    //     } else {
    //         response.writeHead(200);
    //         response.write(data);
    //     }
    //     response.end();
    // });

}).listen(8080); //the server object listens on port 8080
