var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship"),
    deepPopulate = require('mongoose-deep-populate');

// ================= scraper schema =================

var ScraperSchema   = new Schema({
    url     : String,
    pages   : [String],
    script  : String,
    active  : Boolean,
    scraperChild: { type:Schema.ObjectId, ref:"Scraper", childPath:"scraperChild" }

});

ScraperSchema.plugin(deepPopulate);
ScraperSchema.plugin(relationship, { relationshipPathName:'scraperChild' });

module.exports = mongoose.model('Scraper', ScraperSchema);
