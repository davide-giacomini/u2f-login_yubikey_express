const HTTPS = require("https");
const Express = require("express");
const FS = require('fs');
const BodyParser = require("body-parser");
const Cors = require("cors");
const Session = require("express-session");
const U2F = require("u2f");

var app = Express();

const APP_ID = "https://localhost:2015";

app.use(Session({
    secret: "cannotbeguess",
    cookie: {
        secure: true,
        max: 60000
    }
}));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true}));
app.use(Cors({ origin: [APP_ID], credentials: true}));

var user; // It represents our database for now

app.get('/', (req, res) => {
    res.send('Hello HTTPS!');
});

app.get('/register', (request, response, next) => {
    request.session.u2f = U2F.request(APP_ID);
    /* THE REQUEST FUNCTION RETURNS AN OBJECT LIKE THIS:
    request.session.u2f = {
        version: "U2F_V2",
        appId: appId,
        challenge: toWebsafeBase64(crypto.randomBytes(32))
    };
    */
    response.send(request.session.u2f);
});


app.post('/register', (request, response, next) => {
    var registration = U2F.checkRegistration(request.session.u2f, request.body.registerResponse);
    if (!registration.successful) {
        return response.status(500).send({ message: error });
    }
    user = registration;
    response.send({ message: "Hardware key registered! "});
});

app.get('/login', (request, response, next) => {
    request.session.u2f = U2F.request(APP_ID, user.keyHandle);
    response.send(request.session.u2f);
});

app.post('/login', (request, response, next) => {
    var success = U2F.checkSignature(request.session.u2f, request.body.loginResponse, user.publicKey);
    response.send(success);
});

// HTTPS.createServer({}, app).listen(3000, () => {
//   console.log('Listening...');
// })

HTTPS.createServer({
    key: FS.readFileSync("./server.key"),
    cert: FS.readFileSync("./server.cert")
}, app).listen(443, () => {
    console.log('Listening on port 443...');
});

// app.listen(3000, () => {
//     console.log("Hello world");
// });