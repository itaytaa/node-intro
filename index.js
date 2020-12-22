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
        let randomNum = getRandomInt(1, 7)
        if (randomNum === 4) {
            console.log(randomNum)
            response.writeHead(200, {'Content-Type': 'text/html'})
            response.write('<h1>You WON!</h1>')
            response.end();
            return
        } else {
            console.log(randomNum)
            response.writeHead(200, {'Content-Type': 'text/html'})
            response.write('<h1>You lost :(</h1>')
            response.end();
            return
        }
    } else {
        response.writeHead(404);
        response.write('Unauthorized')
        response.end();
    }
}).listen(8080);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  


console.log('listening on:http://localhost:8080') 