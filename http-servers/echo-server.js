const http = require('http');
const url = require('url');

http.createServer(function(request,response){

    const urlParsed = url.parse(request.url, true);

    response.writeHead(200);
    request.on('data',function(message){
        response.write(message);
    });

    request.on('end',function(){
        if (urlParsed.query && urlParsed.query.message) {
            response.end(urlParsed.query.message);
        }
    });
}).listen(8080);
