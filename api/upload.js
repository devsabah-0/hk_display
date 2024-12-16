const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const file = req.body.file;
  const fileName = req.body.fileName;

  if (!file || !fileName) {
    return res.status(400).send('File and filename are required');
  }

  const filePath = path.join(__dirname, '../public/images', fileName);

  fs.writeFile(filePath, file, 'base64', (err) => {
    if (err) {
      return res.status(500).send('Error saving file');
    }
    res.status(200).send('File uploaded successfully');
  });
};
