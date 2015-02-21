/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /searches              ->  index
 * POST    /searches              ->  create
 * GET     /searches/:id          ->  show
 * PUT     /searches/:id          ->  update
 * DELETE  /searches/:id          ->  destroy
 */

'use strict';

//var Search = require('../search/search.model');
var User   = require('./user.model');

exports.index = function(req, res) {
    User.find({}, function(err, users) {
        if (err) res.send(err);
        res.json(users);	                                                                        			// return the users
    });
};

exports.create = function(req, res) {
    var user = new User(req.body);		                                                                        // create a new instance of the User model
    user.save(function(err) {
        if (err) {
            if (err.code == 11000) return res.json({ success: false, message: 'A user with that username already exists. '}); 	// duplicate entry
            else return res.send(err);
        }
        res.json({ message: 'User created!' });
    });
};

exports.show = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err) res.send(err);
        res.json(user);		                                                                            		// return that user
    });
};

exports.update = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err) res.send(err);
        if (req.body.name) user.name = req.body.name;	                                            			// set the new user information if it exists in the request
        if (req.body.username) user.username = req.body.username;
        if (req.body.password) user.password = req.body.password;
        user.save(function(err) {	                                                                			// save the user
            if (err) res.send(err);
            res.json({ message: 'User updated!' });
        });
    });
};

exports.destroy = function(req, res) {
    User.remove({ _id: req.params.user_id }, function(err, user) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
};


exports.me = function(req, res) {
    User.findOne({ name: req.decoded.name}, function(err, user) {
        if (err) res.send(err);
        res.json(user);	                                                                        			// return the users
    });
};
