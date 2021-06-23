var express = require('express');
var app = express();
var puppeteer = require('puppeteer');
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
app.get('/', (req, res) => {

  res.send('<h1>Welcome To Home Page <br><small> NodeJs App from digital ocean Tutorial');

});

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


app.get('/pdfgenerator/:type?', (req, res) => {

  'use strict';

    var _this = this;

    (function callee$0$0() {
      var siteUrl, format, browser, page, pdf, pdfBase64, obj, pdfname, fs, file, stat;
      return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            context$1$0.prev = 0;
            siteUrl = req.query.url ? req.query.url : 'https://l2l-prints.boringserver.com/report-inherited-properties-text.html';
            format = req.query.format ? req.query.format : 'A4';
            context$1$0.next = 5;
            return regeneratorRuntime.awrap(puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] }));

          case 5:
            browser = context$1$0.sent;
            context$1$0.next = 8;
            return regeneratorRuntime.awrap(browser.newPage());

          case 8:
            page = context$1$0.sent;
            context$1$0.next = 11;
            return regeneratorRuntime.awrap(page.goto(siteUrl));

          case 11:
            context$1$0.next = 13;
            return regeneratorRuntime.awrap(page.goto(siteUrl, {
              waitUntil: "networkidle0"
            }));

          case 13:
            context$1$0.next = 15;
            return regeneratorRuntime.awrap(page.pdf({
              // printBackground: true,
              encoding: 'base64',
              path: "report.pdf",
              format: format,
              scale: 1.67
              // margin: {
              //     top: "20px",
              //     bottom: "40px",
              //     left: "20px",
              //     right: "20px"
              // }
            }));

          case 15:
            pdf = context$1$0.sent;
            context$1$0.next = 18;
            return regeneratorRuntime.awrap(browser.close());

          case 18:
            pdfBase64 = 'data:application/pdf;base64,' + pdf.toString('base64');
            obj = {
              format: format,
              url: req.query.url,
              pdfBase64: pdfBase64
            };

            if (req.params.type == 'show') {
              res.contentType("application/pdf");
              res.send(pdf);
            } else if (req.params.type == 'download') {
              pdfname = req.query.filename || 'downloaded-pdf';

              pdfname = 'string' == typeof pdfname ? decodeURIComponent(pdfname) : pdfname;
              fs = require('fs');
              file = fs.createReadStream('./report.pdf');
              stat = fs.statSync('./report.pdf');

              res.setHeader('Content-Length', stat.size);
              res.setHeader('Content-Type', 'application/pdf');
              res.setHeader('Content-Disposition', 'attachment; filename=' + pdfname + '.pdf');
              file.pipe(res);
            } else res.json(obj);

            // res.contentType("application/pdf");
            // res.send(pdf);

            context$1$0.next = 27;
            break;

          case 23:
            context$1$0.prev = 23;
            context$1$0.t0 = context$1$0['catch'](0);

            console.error('oops, something went wrong!' + context$1$0.t0);
            res.json({ error: 'something went worng!' + context$1$0.t0 });
            // res.send('<h1>Error!! '+ error);

          case 27:
          case 'end':
            return context$1$0.stop();
        }
      }, null, _this, [[0, 23]]);
    })();



});


app.listen(PORT, function () { console.log('Server is running at http://localhost:' + PORT) });

