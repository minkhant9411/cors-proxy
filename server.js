const express = require('express');
const request = require('request');
const app = express();

const PORT = 3000; // You can change the port number as needed

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Update the * to your specific domain if necessary
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/proxy', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('Missing URL parameter.');
  }

  request(url, (error, response, body) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.send(body);
  });
});

app.listen(PORT, () => {
  console.log(`CORS Proxy Server is running on port ${PORT}`);
});

