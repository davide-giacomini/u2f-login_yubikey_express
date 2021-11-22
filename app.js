const HTTPS = require("https");
const Express = require("express");
const FS = require('fs');

var app = Express();

app.get('/', (req, res) => {
    res.send('Hello HTTPS!');
});

// HTTPS.createServer({}, app).listen(3000, () => {
//   console.log('Listening...');
// })

HTTPS.createServer({
    key: FS.readFileSync("server.key"),
    cert: FS.readFileSync("server.cert")
}, app).listen(3000, () => {
    console.log('Listening...');
});

// app.listen(3000, () => {
//     console.log("Hello world");
// });