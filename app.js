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
    io         = require('socket.io'),
    http       = require('http'),
    server     = http.createServer(app),
    io         = io.listen(server),
    restify    = require('express-restify-mongoose')

var User       = require('./server/user/user.model'),
    Search     = require('./server/search/search.model'),
    Article    = require('./server/article/article.model');

require('require-dir');
require('./server/sockets/base')(io);
io.set('log level', 1000);

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

//var apiRoutes = require('./routes')(app, express);
//app.use('/api', apiRoutes);


var router = express.Router();
restify.serve(router, User);
restify.serve(router, Article);
restify.serve(router, Search);

app.use('/', router);


app.get('*', function(req, res) { res.sendFile(path.join(__dirname + '/client/index.html')); });

module.exports = app;
server.listen(config.port);
console.log('Magic happens on port ' + config.port);