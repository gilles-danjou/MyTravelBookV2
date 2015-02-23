var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	relationship = require("mongoose-relationship");
var deepPopulate = require('mongoose-deep-populate');



// ================= article schema =================

var ArticleSchema   = new Schema({
	searches   : [{ type:Schema.ObjectId, ref:"Search", childPath:"articles" }],
	"info": {

		"image": String,
		"imageTitle": String,
		"bubble": String,
		"link1": {
		"label": String,
			"uri": String
	},
	"comment": String,
		"title": String,
		"summary": String
	},
    weather: String,
    weatherDetails: [{
        "weatherHTML"           : String,
        "Average T max (°C)"    : String,
        "Average T min (°C)"    : String,
        "Month"                 : String,
        "Precipitations(mm)"    : String,
        "Rating"                : String,
        "Record T min (°C)"     : String,
        "Record Tmax (°C)"      : String,
        "Sunlight(h/d)"         : String,
        "Wet days"              : String
    }]
});

ArticleSchema.pre('save', function(next) {
	console.log('A new article was inserted:\n');
	next();
});


ArticleSchema.plugin(deepPopulate);

module.exports = mongoose.model('Article', ArticleSchema);
