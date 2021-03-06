/**
 * Main application routes
 */

'use strict';
var jwt        = require('jsonwebtoken');
var config     = require('./config');
var User       = require('./server/user/user.model');

module.exports = function(app, express) {

    var apiRouter = express.Router();

    apiRouter.use(function(req, res, next) {
        console.log('Somebody just came to our app!');
        var token = req.body.token || req.param('token') || req.headers['x-access-token'] || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoic3V6aWUiLCJ1c2VybmFtZSI6InN1emllIiwiaWF0IjoxNDI1MzE5NzQwLCJleHAiOjE0MjYxODM3NDB9.pbQ5LosQjaOSY_dgwaFdAg8HdrrD5n66vyQjA7wwRyI";

        if (token) {
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) { res.status(403).send({ success: false,  message: 'Failed to authenticate token1.' });
                } else {
                    req.decoded = decoded;
                    User.findOne({ name: decoded.name }, function(err, user) {
                        req.user = user;
                    });
                    next();
                }
            });
        } else {
            res.status(403).send({ success: false, message: 'No token provided.' });
        }
    });

    app.use(express.static(__dirname + '/client'));

    apiRouter.use('/users'      , require('./server/user'));
    apiRouter.use('/searches'      , require('./server/search'));
    //apiRouter.use('/test'        , require('./api/test'));
    //apiRouter.use('/snipet'        , require('./api/snipet'));
    //apiRouter.use('/scrapers'         , require('./api/scraper'));

    apiRouter.get('/', function(req, res) { res.json({ message: 'hooray! welcome to our api!' }); });

    return apiRouter;

};
