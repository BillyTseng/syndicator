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

module.exports = router;
