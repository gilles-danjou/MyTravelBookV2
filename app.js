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
    restify    = require('express-restify-mongoose'),
    isbot = require('is-bot'),

//io         = require('socket.io')(http),

    User       = require('./server/user/user.model'),
    Search     = require('./server/search/search.model'),
    Article    = require('./server/article/article.model'),
    Country    = require('./server/country/country.model');


//require('./server/sockets/index')(io);


require('require-dir');
//require('./server/sockets/index')(io);

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
restify.serve(router, Country);

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

/*******************
 *
 * @type {*|exports}
 */

var users = {};

// This setting is needed on heroku so that we have access to
// the visitor's ip addresses. Remove it if you don't use heroku:

app.enable('trust proxy');


// This is the special tracking url, which you should embed in an img on your site:

app.get('/ping', function (req, res) {

    // The /ping url has been requested by a web scanning bot.
    // We don't want to count it as a visitor so we will ignore it

    if(isbot(req.headers['user-agent'])){
        return res.send('Bad robot!');
    }

    var ip = req.ip;

    // FreeGeoIP has a very simple api

    request('http://www.geoplugin.net/json.gp?ip=' + ip, function (e, r, body) {

        try {
            var data = JSON.parse(body);
        }
        catch(e){
            return;
        }

        if (!e && r.statusCode == 200) {
            if(data.geoplugin_countryName){

                // Store the users in an object with their ip as a unique key

                users[ip]={
                    timestamp : new Date(),
                    latitude : data.geoplugin_latitude,
                    longitude: data.geoplugin_longitude,
                    country: data.geoplugin_countryName
                };

            }
        }
        if(e){
            console.error(e);
        }
    });

    res.send('Done');

});

app.get('/online', function (req, res) {

    var data = [],
        list = [];

    // How many minutes to consider an ip address online after /ping is visited
    // Currently it if 5 minutes. Feel free to change it

    var onlineInMinutes = 5;

    for (var key in users) {

        if (!users.hasOwnProperty(key)) continue;

        if (new Date - users[key]['timestamp'] < 1000 * 60 * onlineInMinutes){

            data.push({
                latitude: users[key]['latitude'],
                longitude: users[key]['longitude'],
                country : users[key]['country']
            });

        }

        // If a user hasn't visited for more than 6 hours
        // remove him from the users array.
        if (new Date - users[key]['timestamp'] > 1000*60*60*6){
            delete users[key];
        }

    }

    // Iterate all entries,
    // remove those with repeating country names
    // and place them in an array of objects with a corresponding count number

    data.forEach(function (a) {

        // If the country is already in the list, increase the count and return.

        for(var i=0; i<list.length; i++){
            if(list[i].countryName == a.country) {
                list[i].usersOnline++;
                return;
            }
        }

        // Otherwise, add a new country to the list

        list.push({
            latitude : a.latitude,
            longitude : a.longitude,
            countryName: a.country,
            usersOnline: 1
        });

    });


    // Sort the countries by number of users online

    list.sort(function (a,b) {

        if (a.usersOnline > b.usersOnline)
            return -1;
        if (a.usersOnline < b.usersOnline)
            return 1;
        return 0;

    });

    // Send our json response.
    // coordinates contains the information about all users
    // countriesList contains information without repeating country names and is sorted

    res.send({
        coordinates: data,
        countriesList: list
    });

});
/********
 *
 * @type {*|exports}
 */


module.exports = app;
server.listen(config.port);
console.log('Magic happens on port ' + config.port);