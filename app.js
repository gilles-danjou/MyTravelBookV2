var
    express    = require('express'),
    app        = express(),
    config 	   = require('./config'),
    path 	   = require('path'),
    favicon    = require('serve-favicon'),
    logger     = require('morgan'),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan     = require('morgan'), 		// used to see requests
    jwt        = require('jsonwebtoken'),
    http       = require('http'),
    server     = http.createServer(app),
    WebSocketServer         = require('ws').Server,
    restify    = require('express-restify-mongoose')

var User       = require('./server/user/user.model'),
    Search     = require('./server/search/search.model'),
    Article    = require('./server/article/article.model');

require('require-dir');
//require('./server/sockets/index')(io);

/*
var wss = new WebSocketServer({
    server: server,
    path: '/'
});

wss.on('connection', function (ws) {

    ws.send('echo server');

    ws.on('message', function (message) {
        ws.send(message);
    });

});
*/


/*io.on('connection', function(socket){
    console.log('a user connected');
    //
    //io.on('message', function (data) {
    //    console.log('socket message recieved:' + data);
    //});

    //socket.broadcast.emit('user connected');

});*/

app.use(favicon('client/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {                                                                                      // configure our app to handle CORS requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.use(morgan('dev'));                                                                                                 // log all requests to the console
mongoose.connect(config.database);
app.use(express.static(__dirname + '/client'));                                                                         // set static files location used for requests that our frontend will make

var apiRoutes = require('./routes')(app, express);
app.use('/api', apiRoutes);


var router = express.Router();
restify.serve(router, User);
restify.serve(router, Article);
restify.serve(router, Search);

app.use('/', router);

app.use('/authenticate', function(req, res, next) {

    User.findOne({ username: req.body.username }).select('name username password').exec(function(err, user) {         // find the user
        if (err) throw err;                                                                                             // no user with that username was found
        if (!user) { res.json({ success: false,  message: 'Authentication failed. User not found.' });
        } else if (user ) {
                var validPassword = user.comparePassword(req.body.password);                                                  // check if password matches
            if (!validPassword) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                var token = jwt.sign({ name: user.name, username: user.username }, config.secret, { expiresInMinutes: 14400 });// if user is found and password is right create a token - // expires in 24 hours
                res.json({ success: true, user:user, message: 'Enjoy your token!', token: token });
            }
        }
    });
});

app.get('*', function(req, res) { res.sendFile(path.join(__dirname + '/client/index.html')); });



module.exports = app;
server.listen(config.port);
console.log('Magic happens on port ' + config.port);