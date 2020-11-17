//COVID-19 App Web Server
//Hashim I.
//13/11/2020

//Different modules that are required.
//This is how you call them in node.
var HTTP = require('http');
var FILE = require('fs');
var URL = require('url');

//npm install mime-types
var lookup = require('mime-types').lookup;

//The port listened to will initially be defined as the port Heroku chooses.
//If this port is for some reason inaccessbile, default to port 3000 instead.
var PORT = process.env.PORT || 3000;

//Creates the server, specifying the function below. 
var server = HTTP.createServer(function(req, res) {

  //Process request and serve up appropriate file in 'public' folder
  let parsedURL = URL.parse(req.url, true);

  //remove the leading and trailing slashes
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
  if (path == "") {
    path = 'global.html';
  }

  console.log(`Requested path ${path}`);

  let file = __dirname + '/public/' + path;

  FILE.readFile(file, function(err, content) {

    if (err) {
      console.log(`File Not Found ${file}`);
      res.writeHead(404);
      res.end();
    }
    else {
      //Specify content type
      console.log(`Returning ${path}`);
      res.setHeader('X-Content-Type-Options', 'nosniff');

      //Condensing 50+ lines of code into 2 with 1 dependency!
      let mime = lookup(path);
      res.writeHead(200, {'Content-type': mime});

      res.end(content);
    }
  })

  });


//The created server should listen to the port
//and send connection status to the console.
server.listen(PORT, function(error) {
  if (error) {
    console.log('Something went wrong' ,error);
  }
  else {
    console.log('Listening on port: ' + PORT);
  }
})
