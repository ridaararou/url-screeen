const express = require('express');
// const domtoimage = require('dom-to-image');
const puppeteer = require('puppeteer');
// npm install node-html-to-image

const app = express();
const PORT = process.env.PORT || 5000;



app.get('/about', (req, res) => {
  res.send('<h1> Hello Every one to about page</h1>');
});

app.get('/htmlimg', (req, res) => {
  
  res.send('<h1> Hello Every one to about page</h1>');
});

app.get('/:type?', (req, res) => {


  (async () => {
    try {

      //url: 'https://l2l-develop.boringserver.com/ssi-editor-generate-template.html?templateType=instagram&templateData=%7B%20%22template%22%3A%204%2C%20%22colors%22%3A%20%7B%22primary%22%3A%20%22rgba(170%2C%20200%2C%2040%2C%200.9)%22%2C%20%22secondary%22%3A%20%22%23f09%22%7D%2C%20%22font%22%3A%20%22Avenir%20Next%22%2C%20%22title%22%3A%20%22OPEN%20HOUSE%20in%20Martil%22%2C%20%22subtitle%22%3A%20%22Click%20Or%20Text%209494%20to%209999%20for%20More%20Photos!%22%2C%20%22textPosition%22%3A%20%22bottom%22%2C%20%22moreImgNb%22%3A%20%2220%22%2C%20%22agent%22%20%3A%20%7B%20%22src%22%3A%20%22https%3A%2F%2Fimages.pexels.com%2Fphotos%2F220453%2Fpexels-photo-220453.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D1%26w%3D300%22%2C%20%22position%22%3A%20%22left%20top%22%2C%20%22rotation%22%3A%20%220%22%20%7D%2C%20%22images%22%3A%20%5B%20%7B%20%22src%22%3A%20%22tools%2Fsocial-share-image-templates%2Fimg%2F1.jpg%22%2C%20%22position%22%3A%20%22center%22%2C%20%22rotation%22%3A%20%220%22%20%7D%2C%20%7B%20%22src%22%3A%20%22tools%2Fsocial-share-image-templates%2Fimg%2F2.jpg%22%2C%20%22position%22%3A%20%22right%20bottom%22%2C%20%22rotation%22%3A%20%220%22%20%7D%2C%20%7B%20%22src%22%3A%20%22tools%2Fsocial-share-image-templates%2Fimg%2F3.jpg%22%2C%20%22position%22%3A%20%22center%22%2C%20%22rotation%22%3A%20%220%22%20%7D%2C%20%7B%20%22src%22%3A%20%22tools%2Fsocial-share-image-templates%2Fimg%2F4.jpg%22%2C%20%22position%22%3A%20%22left%20top%22%2C%20%22rotation%22%3A%20%220%22%20%7D%20%5D%20%7D';
      var siteUrl = (req.query.url) ? (req.query.url) : 'https://l2l-develop.boringserver.com/ssi-editor-generate-template.html?templateType=instagram&templateData';
      var width = (req.query.width) ? (req.query.width) : 1200;
      var height = (req.query.height) ? (req.query.height) : 1200;

      console.log(req.query.url, siteUrl)

      // const browser = await puppeteer.launch({ignoreDefaultArgs: ['--disable-extensions']});
      const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
      // const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(siteUrl);
      var img = await page.screenshot({ 
        // path: 'social-share-image.png',
        // fullPage: true,
        encoding: 'base64',
        clip: {
          x: 0, y:0,
          width: parseInt(width) || 1200,
          height: parseInt(height) || 1200 // 628 for facebook templates and 1200 for instagram 
        }
      });
      await browser.close();

      // 
      img = 'data:image/jpeg;base64,' + img;

      // 
      var obj = {
        height,
        width,
        url: req.query.url,
        imageBase64: img
      }

      // console.log(obj)
      if(req.params.type == 'json')
        res.json(obj);
      else
        res.send(`<h1>Social Share Image by Rida Ararou - Kreatinc</h1> <pre>${JSON.stringify(obj)}</pre> <br><br><img src="${img}">` );

    } catch (error) {
      console.error('oops, something went wrong!' + error);
      res.json({error: 'something went worng!' + error});
      // res.send('<h1>Error!! '+ error);
    }
  })();

})


app.listen(PORT, ()=> { console.log('server is running at http://localhost:'+PORT) });


// // base64toBlob
// const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
//   const byteCharacters = Buffer.from(b64Data, 'base64').toString()// atob(b64Data);
//   const byteArrays = [];

//   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//     const slice = byteCharacters.slice(offset, offset + sliceSize);

//     const byteNumbers = new Array(slice.length);
//     for (let i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }

//     const byteArray = new Uint8Array(byteNumbers);
//     byteArrays.push(byteArray);
//   }

//   const blob = new Blob(byteArrays, {type: contentType});
//   return blob;
// }