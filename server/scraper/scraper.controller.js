/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /scrapers              ->  index
 * POST    /scrapers              ->  create
 * GET     /scrapers/:id          ->  show
 * PUT     /scrapers/:id          ->  update
 * DELETE  /scrapers/:id          ->  destroy
 */

'use strict';

var Scraper  = require('./scraper.model');

// ================= /scrapers =================
exports.index = function(req, res) {
    Scraper.find({}, function(err, scrapers) {
        if (err) res.send(err);
        res.json(scrapers);	                                                                        			// return the users
    });
};

