/*
 * Filename: \server.js
 * Created Date: Saturday, January 9th 2021, 6:55:25 pm
 * Author: Kenny Gosai
 */

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const axios = require("axios");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/userData", (req, res, next) => {
  axios
    .get(`https://www.tabtu.top/pic/100.json`, {
      headers: { "Access-Control-Allow-Origin": true },
    })
    .then(function (response) {
      // handle success
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      next(error);
    });
});
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else {
  // Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
}
app.listen(port, () => {
  console.log(`SmartEcomTech Code Test Server listening at http://localhost:${port}`);
});
