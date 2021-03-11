const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const path = require('path');
const PORT = process.env.PORT || 5000;


// production code
try {
  
  // run polyfill for production
  var fs = require('fs'), vm = require('vm');
  var includeInThisContext = function(path) { var code = fs.readFileSync(path); vm.runInThisContext(code, path);  }.bind(this);
  includeInThisContext("pollyfill.js");
  
  // url screen api
  app.get('/urlscreen/prod', (req, res) => {
  
    'use strict';
  
    var _this = this;
  
    (function callee$0$0() {
      var siteUrl, width, height, browser, page, img, imageBase64, obj;
      return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            context$1$0.prev = 0;
            siteUrl = req.query.url ? req.query.url : 'https://l2l-develop.boringserver.com/ssi-editor-generate-template.html?templateType=instagram&templateData';
            width = req.query.width ? parseInt(req.query.width) : 1200;
            height = req.query.height ? parseInt(req.query.height) : 1200;
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
              imageBase64: imageBase64,
              type: 'Prod'
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
} catch (error) {}


// Home page
app.get('/', (req, res) => {
  res.send('<html lang="en" class=" js flexbox canvas canvastext webgl no-touch geolocation postmessage websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers no-applicationcache svg inlinesvg smil svgclippaths"><head> <meta charset="UTf-8"> <title>Home URL Screenshot | Kreatinc</title> <meta name="description" content="Template 01 of social Share Image"> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">  <meta http-equiv="X-UA-Compatible" content="ie=edge"> <link rel="preload" href="img/icons.svg" as="image" type="image/svg+xml"> <link rel="stylesheet" href="https://bootswatch.com/4/darkly/bootstrap.min.css">   </head> <body data-new-gr-c-s-check-loaded="14.997.0" data-gr-ext-installed="" contenteditable="false" class=""> <div class="container mt-5 text-center" data-children-count="1"> <h1 class="">Welcome to <b class="text-success" data-children-count="0"> raUrlScreen </b></h1> <div data-children-count="1"><input id="inputURL" class="form-control mr-3" style=" width: 400px; display: inline-block; vertical-align: middle; " placeholder="Enter a page url to convert it to an image"><a id="showBtn" target="_blank" class="btn btn-primary mr-1" href="/urlscreen/show?width=1200&height=628&url=">show generate image</a> <a id="jsonBtn" target="_blank" class="btn btn-warning" href="/urlscreen/?width=1200&height=628&url=">JSON</a></div> <h5 style=" position: fixed; bottom: 5px; left: 0; width:100% ">Copyrights <a target="_blank" href="https://www.linkedin.com/in/rida-ararou-455167131/">@Rida Ararou </a>  - <a target="_blank" href="https://www.linkedin.com/company/kreatinc/">Kreatinc.Ltd</a></h5> <script>document.querySelector("#inputURL").addEventListener("input" , function() { console.log(this.value); document.getElementById("showBtn").setAttribute("href", "/urlscreen/show?url="+encodeURIComponent(this.value)); document.getElementById("jsonBtn").setAttribute("href", "/urlscreen/?url="+encodeURIComponent(this.value)) }) </script></div> </body></html>')
});

// SSI Editor
app.use(express.static(path.join(__dirname, 'client')))
app.get('/editor', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/ssi-editor.html'))
})

// url screenshot API
app.get('/urlscreen/:type?', (req, res) => {

  (async () => {
    try {

      //url: 'https://l2l-develop.boringserver.com/ssi-editor-generate-template.html?templateType=instagram&templateData=%7B%20%22template%22%3A%204%2C%20%22colors%22%3A%20%7B%22primary%22%3A%20%22rgba(170%2C%20200%2C%2040%2C%200.9)%22%2C%20%22secondary%22%3A%20%22%23f09%22%7D%2C%20%22font%22%3A%20%22Avenir%20Next%22%2C%20%22title%22%3A%20%22OPEN%20HOUSE%20in%20Martil%22%2C%20%22subtitle%22%3A%20%22Click%20Or%20Text%209494%20to%209999%20for%20More%20Photos!%22%2C%20%22textPosition%22%3A%20%22bottom%22%2C%20%22moreImgNb%22%3A%20%2220%22%2C%20%22agent%22%20%3A%20%7B%20%22src%22%3A%20%22https%3A%2F%2Fimages.pexels.com%2Fphotos%2F220453%2Fpexels-photo-220453.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D1%26w%3D300%22%2C%20%22position%22%3A%20%22left%20top%22%2C%20%22rotation%22%3A%20%220%22%20%7D%2C%20%22images%22%3A%20%5B%20%7B%20%22src%22%3A%20%22tools%2Fsocial-share-image-templates%2Fimg%2F1.jpg%22%2C%20%22position%22%3A%20%22center%22%2C%20%22rotation%22%3A%20%220%22%20%7D%2C%20%7B%20%22src%22%3A%20%22tools%2Fsocial-share-image-templates%2Fimg%2F2.jpg%22%2C%20%22position%22%3A%20%22right%20bottom%22%2C%20%22rotation%22%3A%20%220%22%20%7D%2C%20%7B%20%22src%22%3A%20%22tools%2Fsocial-share-image-templates%2Fimg%2F3.jpg%22%2C%20%22position%22%3A%20%22center%22%2C%20%22rotation%22%3A%20%220%22%20%7D%2C%20%7B%20%22src%22%3A%20%22tools%2Fsocial-share-image-templates%2Fimg%2F4.jpg%22%2C%20%22position%22%3A%20%22left%20top%22%2C%20%22rotation%22%3A%20%220%22%20%7D%20%5D%20%7D';

      var siteUrl = (req.query.url) ? (req.query.url) : 'https://l2l-develop.boringserver.com/ssi-editor-generate-template.html?templateType=facebook&templateData';
      var width = (req.query.width) ? parseInt(req.query.width) : 1200;
      var height = (req.query.height) ? parseInt(req.query.height) : 1200;

      console.log(req.query.url, siteUrl);
      
      // const browser = await puppeteer.launch({ignoreDefaultArgs: ['--disable-extensions']});
      const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions']});
     
      const page = await browser.newPage();
      await page.goto(siteUrl);
      var img = await page.screenshot({ 
        // path: 'social-share-image.png',
        // fullPage: true,
        encoding: 'base64',
        clip: {
          x: 0, y:0,
          width: width || 1200,
          height: height || 1200 // 628 for facebook templates and 1200 for instagram 
        }
      });
      await browser.close();

      // 
      var imageBase64 = 'data:image/jpeg;base64,' + img;

      // 
      var obj = {
        height,
        width,
        url: req.query.url,
        imageBase64: imageBase64,
        type: 'DEV'
      }

      // console.log(obj)
      if(req.params.type == 'show')
        res.send(`
          <img src="${imageBase64}">
          <br>
          <br>
          <h1 style='font-family: "-apple-system", "BlinkMacSystemFont", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
          font-size: 16px; margin-top: 50px'>Social Share Image by <a target="_blank" href="https://github.com/ridaararou">Rida Ararou</a> - <a target="_blank" href="https://www.linkedin.com/company/kreatinc/">Kreatinc</a></h5> 
          <!-- <pre style="background: #eeeeee; padding: 10px; border-radius: 5px;">${JSON.stringify(obj)}</pre> -->
        `);
      else
        res.json(obj);

    } catch (error) {
      console.error('oops, something went wrong!' + error);
      res.json({error: 'something went worng!' + error});
      // res.send('<h1>Error!! '+ error);
    }
  })();

});

// about page example
app.get('/about', (req, res) => {
  res.send('<h1> Social Share Image Editor -  <a href="https://www.kreatinc.com/">Kreatinc</a>  | <a target="_blank" href="https://github.com/ridaararou">Rida Ararou</a></h1>');
});



app.listen(PORT, () => { console.log('server is running at http://localhost:'+PORT) });

