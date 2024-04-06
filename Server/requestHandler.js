var url = require('url');
var fs = require('fs');

function render(path, response){
    fs.readFile(path, null, function(error, data){
        if (error){
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.write('File not found');
        }else{
            response.writeHead(200, {'Content-Type': 'text/html'})
            response.write(data);
        }
        response.end()
    })
}

module.exports = {

    handleRequest: function(request, response){
        // response.writeHead(200, {'Content-Type': 'text/html'})

        var path = url.parse(request.url).pathname;
        switch(path){
            case '/':
                render('./index.html', response);
                break;
            case '/login':
                render('./login.html', response);
                break;
            default:
                response.writeHead(404);
                response.write('Path not found');
                response.end();
        }


        
    }
}