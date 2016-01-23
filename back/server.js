var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var Address = require('./models/index.js').Address;

var PAGINATION_LIMIT = 5;

app.use(cors());

app.get('/api/address', function(req, res) {
  var offset = req.query.offset || 0;
  Address.findAndCountAll({ limit: PAGINATION_LIMIT, offset: offset }).then(function(result) {
    var addresses = result.rows;
    var links = {};
    if (offset + PAGINATION_LIMIT < result.count)
      links.next = "http://cmc.im:9005/api/address?offset=" + (offset + PAGINATION_LIMIT);
    if (offset > 0)
      links.prev = "http://cmc.im:9005/api/address?offset=" + (Math.max(offset - PAGINATION_LIMIT, 0));
    res.links(links);
    return res.json(addresses);
  });
});

app.post('/api/address/:id', bodyParser.urlencoded(), function(req, res) {
  var updates = {};
  function update(v) {
    if (req.body[v] != null)
      updates[v] = req.body[v];
  }
  ["number", "street", "city", "postcode", "firstname", "lastname", "lat", "long"].forEach(update);
  Address.update(updates, { where: { id: req.params.id } }).then(function() {
    return res.json({});
  }).catch(function(err) {
    return res.status(500).json({ err: err.stack });
  });
});

app.post('/api/address', bodyParser.urlencoded(), function(req, res) {
  console.log(req.body);
  Address.create({
    number: req.body.number,
    street: req.body.street,
    city: req.body.city,
    postcode: req.body.postcode,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    lat: req.body.lat,
    long: req.body.long
  }).then(function(addr) {
    return res.json(addr);
  }).catch(function(err) {
    return res.status(500).json({ "err": err.stack });
  });
});

app.listen(9005);
