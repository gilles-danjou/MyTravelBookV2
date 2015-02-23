


var snipet = $('#middle > div:nth-child(12) > table')

var weatherHTML = snipet.html();
var weather = snipet.tableToJSON();

var result =  {
    //'weather' : weatherHTML,
    'weatherDetails' : weather
};


