/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /articles              ->  index
 * POST    /articles              ->  create
 * GET     /articles/:id          ->  show
 * PUT     /articles/:id          ->  update
 * DELETE  /articles/:id          ->  destroy
 */

'use strict';

var Article  = require('./article.model');

// ================= /articles =================
exports.index = function(req, res) {
    Article.find({}, function(err, articles) {
        if (err) res.send(err);
        res.json(articles);	                                                                        			// return the users
    });
};

