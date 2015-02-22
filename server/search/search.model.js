var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	relationship = require("mongoose-relationship");
var deepPopulate = require('mongoose-deep-populate');

var request  = require('request');
var path = require('path');

var User        = require('../user/user.model');
var Article     = require('../article/article.model');
var Scraper     = require('../scraper/scraper.model');
var webscraper  = require('../scraper/scraper');
var fs = require('fs');

// ================= search schema =================

var SearchSchema   = new Schema({
	query   : String,
	users   : [{ type:Schema.ObjectId, ref:"User", childPath:"searches" }],
	snipets : [String],
	articles: [{ type:Schema.ObjectId, ref:"Article", childPath:"searches" }]
});

SearchSchema.pre('save', function(next) {
	console.log('A new search "%s" was inserted', this.query);
	next();
});

/*SearchSchema.post('init', function (doc) {
	console.log('%s has been saved', doc.query);

	Scraper.find({active : true}, function (err, scrapers) {
		console.log('Begin scrapping');
		scrapers.forEach (function (scraper, index, array){
			console.log('Scrape:' + scraper.url);
			var script = fs.readFileSync(__dirname + '/' + scraper.script).toString();

			var agent = webscraper.createAgent();
			agent.on('done', function (url, result) {
				try {
					var newArticle = new Article(result);
                    newArticle.searches.push(doc);
					newArticle.save(function (err, article) {
                        doc.articles.push(article);
                        console.log(doc)
					});
					agent.next();
				}  catch(err) {
					console.log(err.message);
				}

			});
			agent.start(scraper.url, [doc.query], script);
		});
	});

})*/


SearchSchema.plugin(relationship, { relationshipPathName:'articles' });
SearchSchema.plugin(relationship, { relationshipPathName:'users' });
SearchSchema.plugin(deepPopulate);
module.exports = mongoose.model('Search', SearchSchema);

