/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /searches              ->  index
 * POST    /searches              ->  create
 * GET     /searches/:id          ->  show
 * PUT     /searches/:id          ->  update
 * DELETE  /searches/:id          ->  destroy
 */

'use strict';
var request     = require('request');
var path        = require('path');
var Search      = require('./search.model');
var User        = require('../user/user.model');
var Article     = require('../article/article.model');
var Scraper     = require('../scraper/scraper.model');
var scraper     = require('../scraper/scraper');
var google      = require('google');

var fs = require('fs');

// ================= /searches =================
exports.index = function(req, res) {
	Search
		.find({})
		.deepPopulate('query articles')
		.exec( function(err, searches) {
			if (err) res.send(err);
			res.json(searches);
		});
};

exports.create = function(req, res) {

    Search.findOneAndUpdate({'query' : req.body.query}, {'query' : req.body.query}, {'upsert':true}, function(err, search) {

        var agent = scraper.create();
        agent.on('done', function(url, result){
            result.searches = [search];
            console.log('------------------------')
            console.log(result);
            console.log('------------------------')
            Article.create(result, function(err, newArticle) {
                search.articles.push(newArticle);
                search.save();
            });


            console.log('Scraped finished: ' + url);
        });

        Scraper
            .find({active : true})
            .deepPopulate('scraperChild')
            .exec(function (err, scrapers) {
                scrapers.forEach (function (scraper, index, array) {
                    switch (scraper._doc.type) {
                        case "google":

                            google.resultsPerPage = 5;
                            console.log('Google Search: ' + scraper._doc.query + ' ' + req.body.query);
                            google(scraper._doc.query + ' ' + req.body.query , function (err, next, links) {
                                if (links.length>0) {
                                    if (err) console.error(err);
                                    for (var i = 0; i < links.length; ++i) {
                                        console.log('Google ->  ' + links[i].link);
                                        // console.log(links[i].title + ' - ' + links[i].description + "\n");
                                    }
                                    console.log('Scrape: ' + links[0].link);
                                    agent.start(links[0].link, '', 'scrape-thebesttimetovisit.js');
                                }
                            });

                            break;

                        case "scrape":

                            agent.start(scraper._doc.url + req.body.query, '', 'scrape-wiki-info.js');

                            break;
                    }
                })
            });
    });

    res.json('finished');

};

exports.show = function(req, res) {
	if (req.params.query === 'mine'){
		User
			.findOne({name: req.decoded.name})
			.deepPopulate('searches')
			.exec(function (err, search) {
				Search.populate(search.searches, {path:'articles'},
					function(err, data){
						res.json(data);
					}
				);
			});
	} else {
		Search
			.findById(req.params.query)
			.deepPopulate('query articles')
			.exec(function (err, search) {
				if (err) res.send(err);
				res.json(search);
			});
	}
};
exports.update = function(req, res) {
	Search.findById(req.params.query, function(err, search) {
		if (err) res.send(err);
		if (req.body.query) search.query = req.body.query;
		search.save(function(err) {
			if (err) res.send(err);
			res.json({ message: 'Search updated!' });
		});
	});
};

exports.destroy = function(req, res) {
	Search.remove({ _id: req.params.query }, function(err, search) {
		if (err) res.send(err);
		res.json({ message: 'Successfully deleted' });
	});
};
