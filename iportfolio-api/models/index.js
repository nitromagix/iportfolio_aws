//

const MONGO_URI = process.env.MONGO_URI;

require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect(MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}, () => {
  console.log(`mongoose connected --> ${MONGO_URI}`)
})

module.exports.Place = require('./places');
module.exports.Comment = require('./comment');
module.exports.Profile = require('./profile');
module.exports.Education = require('./education');
module.exports.Experience = require('./experience');
module.exports.Project = require('./project');