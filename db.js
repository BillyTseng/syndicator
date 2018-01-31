var mongoose = require("mongoose");

mongoose.connect("mongodb://<user>:<password>@<dbLink>");

module.exports = mongoose;
