
var	fs = require('fs'),
    util = require('util'),
    EventEmitter = require("events").EventEmitter,
    vm = require('vm'),
    request = require('request'),
    //cheerio = require('cheerio'),
    Iconv  = require('iconv').Iconv,
    jsdom  = require('jsdom'),
    pathMod = require('path');

exports.createAgent = function () {
    return new WebScraper();
};

var WebScraper = function () {
    EventEmitter.call(this);
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

util.inherits(WebScraper, EventEmitter);

WebScraper.prototype.start = function(host, paths, script) {
    if (!this.running) {
        this.running = true;
        this.host = host || 'localhost';
        if ((paths instanceof Array) && paths.length) {
            this.paths = paths
        };
        if (typeof paths === 'string') {
            this.paths[0] = paths
        };
        this.script = script || '';
        // in javascript, assigning an array or an object to a variable makes a reference to the value,
        // so we are using the slice(0) function to make a copy of the array.
        this.unvisited = this.paths.slice(0);
        this.emit('start', this.paths.length);
        this.next();
    }
    else util.log('[wscraper.j] agent is still running, use agent.stop() before to start it again');
};

WebScraper.prototype.stop = function() {
    if (this.running) {
        this.running = false;
        this.emit('stop', this.unvisited.length);
    }
    else util.log('[wscraper.j] agent is not running, use agent.start() before to stop it');
};

WebScraper.prototype.next = function() {
    if (this.running) {
        if (this.unvisited.length > 0) {
            var path = this.unvisited.shift();
            var url = '';
            if (path.indexOf('/') == 0) {
                url = 'http://' + this.host + path;
            } else {
                url = 'http://' + this.host + '/' + path;
            };
            util.log('[wscraper.js] sending a request to: ' + url);
            this.options.uri = url;
            var self = this;
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
        else {
            this.stop();
        }
    }
    else util.log('[wscraper.j] agent is not running, start it by calling agent.start()');
};

// use of the Scraper object without make any http request
exports.run = function (html, script) {

    this.html = html || '';
    this.script = script || '';
    this.emit('run');

    jsdom.env({
        html: body,
        scripts: [pathMod.resolve(__dirname, 'lib/jquery-1.5.min.js'), pathMod.resolve(__dirname, 'lib/jquery.xpath.js')],
        done : function (err, window) {
            var $ = window.jQuery;
            try {
                // run the script in the sandbox
                vm.runInNewContext(self.script, self.sandbox);
            } catch (e) {
                self.emit('abort', e); // catch any error from the script
                return;
            }
            if (self.sandbox.result) {
                self.emit('done', url, self.sandbox.result)
            } else {
                self.emit('abort', 'parsing script is returning null value!')
            }
        }
    }
)};



