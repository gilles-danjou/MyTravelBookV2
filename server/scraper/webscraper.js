
var	fs = require('fs'),
    util = require('util'),
    EventEmitter = require("events").EventEmitter,
    vm = require('vm'),
    request = require('request'),
    //cheerio = require('cheerio'),
    Iconv  = require('iconv').Iconv,
    jsdom  = require('jsdom'),
    pathMod = require('path');

exports.createAgent = function (url, proxy, script) {
    return new WebScraper();
};

var WebScraper = function () {
    this.host = '';
    this.paths = [];
    this.script = '';
    this.sandbox = {
        $: '', // $ -> is the DOM document to be parsed
        result: {} // result -> is the JSON object containing the result of parsing
    };
    this.running = false;
    this.unvisited = [];
    this.options = {
        uri: '',
        method: 'GET',
        headers: { 'accept-charset':'UTF-8', 'accept':'text/html' },
        encoding: null
    };
};

Scraper.prototype.run = function (url, proxy, script) {

    request({url: url , proxy:''}, function (error, response, body) {

        if (error || response.statusCode !=200) {
            self.emit('abort', 'error or bad response from ' + url);
            return
        }
        var data = body || {};
        var encoding = 'UTF-8';
        if (response.headers['content-type'].match('charset=ISO-8859-1')) {
            encoding = 'ISO-8859-1';
        }
        if (encoding != 'UTF-8') { // convert data stream from ISO-8859-1 to UTF-8 encoding
            var iconv = new Iconv(encoding, 'UTF-8');
            data = iconv.convert(body);
        }

        jsdom.env({
            html: body,
            scripts: [pathMod.resolve(__dirname, 'lib/jquery-1.5.min.js'), pathMod.resolve(__dirname, 'lib/jquery.xpath.js')],
            done : function (err, window) {

                self.sandbox.$ = window.jQuery;

                try {
                    vm.runInNewContext(self.script, self.sandbox);
                } catch (e) {
                    console.log(e);
                    self.emit('abort', e); // catch any error from the script
                    return;
                }
                if (self.sandbox.result) {
                    self.emit('done', url, self.sandbox.result)
                } else {
                    self.emit('abort', 'parsing script is returning null value!')
                }
            }
        })
    })

}




