// api/data.js
const express = require('express');
const xlsx = require('xlsx');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/data', (req, res) => {
  const workbook = xlsx.readFile('data.xlsx'); // Ensure your Excel file is named 'data.xlsx' and located in the root directory
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  res.json(data);
});

module.exports = app;
