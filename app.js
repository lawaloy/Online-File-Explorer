// require node modules
const http = require('http');

//file imports
require('./library/respond');

// connection settings
const port = process.env.port || 3000;

//Create Server
const server = http.createServer(respond);


server.list(port, () => {
    console.log('listening on port: ${port}');
});