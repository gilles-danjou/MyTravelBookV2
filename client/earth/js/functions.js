/**
 * Created by gillesdanjou on 24/02/15.
 */



var json = {
    "profile": "mercator",
    "name": "Grand Canyon USGS",
    "format": "png",
    "bounds": [-112.26379395, 35.98245136, -112.10998535, 36.13343831],
    "minzoom": 10,
    "version": "1.0.0",
    "maxzoom": 16,
    "center": [-112.18688965, 36.057944835, 13],
    "type": "overlay",
    "description": "",
    "basename": "grandcanyon",
    "tilejson": "2.0.0",
    "sheme": "xyz",
    "tiles": ["/img/pin1.png"]
};

var overlay = earth.tileLayerJSON(json);