const http = require('http');
const url = require("url");
const path = require("path");
const fs = require("fs");

const hostname = '0.0.0.0';
const port = 3000;
const docroot = '';

const server = http.createServer((request, response) => {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd() + docroot, uri);

    fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});