const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

app.use(bodyParser.json());
app.use(fileUpload());

/** routes **/
app.get('/', (req, res) => res.send('Home!'));

// upload
app.post('/api/image/upload', (req, res) => {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
      }
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.sampleFile;
      console.log(sampleFile.name);
      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(`./uploads/${sampleFile.name}`, function(err) {
        if (err)
          return res.status(500).send(err);

        res.send('File uploaded!');
      });
});

// begin server
app.listen(3000, () => {
    console.log('server running...');
});