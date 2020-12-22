const http = require('http')
const fs = require('fs');


http.createServer((request, response) => {
    if (request.url === '/write') {
        fs.writeFile('text.txt', 'hello world', (err) => {
            if (err) {
                console.log(err);
                response.end();
                return
            }
            response.write('File created')
            response.end();
        });
    } else if (request.url === '/delete') {
        fs.unlink('text.txt', (err) => {
            if (err) {
                console.log(err);
                response.end();
                return
            }
            response.write('File deleted')
            response.end();
        });
    } else if (request.url === '/dice') {
        let randomNum = Math.floor(Math.random() * (7 - 1) + 1)
        if (randomNum === 4) {
            console.log(randomNum)
            response.writeHead(200, {'Content-Type': 'text/html'})
            response.write('<h1 style="color:green;text-align:center; margin:200px;">You WON!</h1>')
            response.end();
            return
        } else {
            console.log(randomNum)
            response.writeHead(200, {'Content-Type': 'text/html'})
            response.write('<h1 style="color:red;text-align:center; margin:200px;">You lost :(</h1>')
            response.end();
            return
        }
    } else {
        response.writeHead(404);
        response.write('Unauthorized')
        response.end();
    }
}).listen(8080);


  


console.log('listening on:http://localhost:8080') 