


var scraper = require('./scraper');
var google = require('google');
var Article = require('../article/article.model');
var Scraper = require('./scraper.model');

exports.index = function(req, res) {

    var agent = scraper.create();
    agent.on('done', function(url, result){
        //console.log(result)
        var newArticle = new Article(result);
        newArticle.save();

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
                            if (links.legth>0) {
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

                        agent.start('http://en.wikipedia.org/wiki/Paris', '', 'scrape-wiki-info.js');

                        break;
                }
            })
        });

res.json('finished');

};
