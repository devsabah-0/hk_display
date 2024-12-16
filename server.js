const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('images'));
app.use(express.static(__dirname));
app.use(fileUpload());

// Endpoint to list images
app.get('/images', (req, res) => {
    fs.readdir(path.join(__dirname, 'images'), (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }
        const screenshots = files.filter(file => file.startsWith('CleanShot'));
        res.json(screenshots);
    });
});

// Endpoint to upload images
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let screenshot = req.files.screenshot;
    let uploadPath = path.join(__dirname, 'images', screenshot.name);

    screenshot.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('File uploaded!');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
