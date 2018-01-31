var express = require('express');
var router = express.Router();
var Event = require("../models/event");
/* GET home page. */
router.get('/', function(req, res, next) {
  // Empty query means find all data in the database.
  var query = {};
  // Query the devices collection to returned requested documents
  Event.find(query, function(err, allEvents) {
    if (err) {
      var errormsg = {"message": err};
      res.status(400).send(JSON.stringify(errormsg));
    } else {
      // Create JSON response to contain all record.
      var responseJson = { record: [] };
      for (var doc of allEvents) {
        // For each found device add a new element to the array
        responseJson.record.push({
          "name": doc.name,
          "description": doc.description,
          "startDate": doc.startDate,
          "endDate": doc.endDate,
          "submitTime": doc.submitTime,
          "price": doc.price,
          "posted": doc.posted
        });
      }
      res.status(200).send(JSON.stringify(responseJson));
    }
  });
});

router.post('/create', function(req, res, next) {
  var startDate = new Date(req.body.startDate);
  var endDate = new Date(req.body.endDate);
  var currentTime = Date.now();

  var newRecord = new Event({
    name:   req.body.eventName,
    description:  req.body.description,
    startDate:   startDate,
    endDate:     endDate,
    price:       req.body.price,
    submitTime: currentTime,
    posted:     false
  });

  newRecord.save( function(err, user) {
      if (err) {
        res.status(400).json( {success: false, message: "Bad Request" } );
      } else {
        res.status(201).json( {success: true, message: "success" } );
      }
  });
});

module.exports = router;
