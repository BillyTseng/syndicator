var db = require("../db");

// Define the schema
var eventSchema = new db.Schema({
    name:   String,
    description:  String,
    startDate:   Date,
    endDate:     Date,
    price:       Number,
    submitTime: { type: Date, default: Date.now },
    posted:     { type: Boolean, default: false }
});

// Creates a Event (plural) collection in the db using the event schema
var Event = db.model("Event", eventSchema);

module.exports = Event;
