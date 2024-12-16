const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/images', (req, res) => {
    fs.readdir(path.join(__dirname, 'public', 'images'), (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }
        const screenshots = files.filter(file => file.startsWith('CleanShot'));
        res.json(screenshots);
    });
});

module.exports = app;
