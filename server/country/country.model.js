var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
//relationship = require("mongoose-relationship"),
   deepPopulate = require('mongoose-deep-populate');



// ================= country schema =================

var CountrySchema   = new Schema({
    "ISO3166A2": String,
    "ISO3166A3": String,
    "ISO3166N3": Number,
    "FIPS104": String,
    "ISOen_name": String,
    "ISOen_proper": String,
    "ISOen_ro_name": String,
    "ISOen_ro_proper": String,
    "ISOfr_name": String,
    "ISOfr_proper": String,
    "ISOes_name": String,
    "UNGEGNen_name": String,
    "UNGEGNen_longname": String,
    "UNGEGNfr_name": String,
    "UNGEGNfr_longname": String,
    "UNGEGNes_name": String,
    "UNGEGNes_longname": String,
    "UNGEGNru_name": String,
    "UNGEGNru_longname": String,
    "UNGEGNlc_ro_name": String,
    "UNGEGNlc_ro_longname": String,
    "BGN_name": String,
    "BGN_proper": String,
    "BGN_longname": String,
    "BGNlc_longname": String,
    "BGNlc_name": String,
    "PCGN_name": String,
    "PCGN_proper": String,
    "PCGN_longname": String,
    "FAOit_name": String,
    "FAOit_proper": String,
    "FAOit_longname": String,
    "EKI_name": String,
    "EKI_longname": String,
    "conabbr": String,
    "HasCapital": String,
    "BGN_capital": String,
    "UNGEGNlc_capital": String,
    "UNen_capital": String,
    "UNfr_capital": String,
    "UNes_capital": String,
    "UNru_capital": String,
    "EKI_capital": String,
    "BGNc_latitude": Number,
    "BGNc_longitude": Number,
    "UNc_latitude": Number,
    "UNc_longitude": Number,
    "continent": String,
    "subcontinent": String,
    "ISOregion": Number,
    "ISOsubregion": Number,
    "language": String,
    "population": Number,
    "year": Number,
    "BGN_demonym": String,
    "BGN_demomyn_adj": String,
    "ITU": Number,
    "IVC": String,
    "land": Number,
    "water": String,
    "land_total": Number,
    "latitude": Number,
    "longitude": Number,
    "maxlatitude": Number,
    "minlatitude": Number,
    "maxlongitude": Number,
    "minlongitude": Number,
    "url_gov": String,
    "url_stats": String,
    "url_gis": String,
    "url_post": String
});

CountrySchema.pre('save', function(next) {
    console.log('A new country was inserted:\n');
    next();
});


CountrySchema.plugin(deepPopulate);

module.exports = mongoose.model('Country', CountrySchema);
