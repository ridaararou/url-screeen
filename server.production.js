var express = require('express');
var app = express();
var puppeteer = require('puppeteer');
var path = require('path');
var PORT = process.env.PORT || 5000;

// run polyfill
try {
  var fs = require('fs');
  var vm = require('vm');
  var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
  }.bind(this);
  includeInThisContext("pollyfill.js");
} catch (error) {}


// url screen api
app.get('/urlscreen', (req, res) => {

  'use strict';

  var _this = this;

  (function callee$0$0() {
    var siteUrl, width, height, browser, page, img, imageBase64, obj;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          siteUrl = req.query.url ? req.query.url : 'https://l2l-develop.boringserver.com/ssi-editor-generate-template.html?templateType=instagram&templateData';
          width = req.query.width ? req.query.width : 1200;
          height = req.query.height ? req.query.height : 1200;
          context$1$0.next = 6;
          return regeneratorRuntime.awrap(puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions'] }));

        case 6:
          browser = context$1$0.sent;
          context$1$0.next = 9;
          return regeneratorRuntime.awrap(browser.newPage());

        case 9:
          page = context$1$0.sent;
          context$1$0.next = 12;
          return regeneratorRuntime.awrap(page.goto(siteUrl));

        case 12:
          context$1$0.next = 14;
          return regeneratorRuntime.awrap(page.screenshot({
            // path: 'social-share-image.png',
            encoding: 'base64',
            clip: {
              x: 0, y: 0,
              width: parseInt(width) || 1200,
              height: parseInt(height) || 1200
            }
          }));

        case 14:
          img = context$1$0.sent;
          context$1$0.next = 17;
          return regeneratorRuntime.awrap(browser.close());

        case 17:
          imageBase64 = 'data:image/jpeg;base64,' + img;
          obj = {
            height: height,
            width: width,
            url: req.query.url,
            imageBase64: imageBase64
          };

          res.json(obj);

          context$1$0.next = 26;
          break;

        case 22:
          context$1$0.prev = 22;
          context$1$0.t0 = context$1$0['catch'](0);

          console.error('oops, something went wrong!' + context$1$0.t0);
          res.json({ error: 'something went worng!' + context$1$0.t0 });

        case 26:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this, [[0, 22]]);
  })();

});


app.listen(PORT, function () { console.log('server is running at http://localhost:' + PORT) });

