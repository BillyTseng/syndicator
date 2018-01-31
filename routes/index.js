var express = require('express');
var router = express.Router();
var Event = require("../models/event");
/* GET home page. */
router.get('/', function(req, res, next) {
  var d1 = new Date("2015-03-25");
  var d2 = new Date("2015-04-25");
  var d3 = Date.now();
  var newRecord = new Event({
    name:   "dummy",
    description:  "dummy story line",
    startDate:   d1,
    endDate:     d2,
    price:       0,
    submitTime: d3,
    posted:     false
  });

  newRecord.save();
  res.render('index', { title: 'Challenge Project' });
});

module.exports = router;
