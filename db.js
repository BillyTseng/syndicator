var mongoose = require("mongoose");

mongoose.connect("mongodb://<user>:<password>@<dbLink>", {
   useMongoClient: true,
});

module.exports = mongoose;
