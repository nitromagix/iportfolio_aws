const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  school: {
    type: String,
    default: "State College",
  },
  date: {
    type: String,
    default: "2022",
  },
  acheivement: {
    type: String,
    default: "ThriveDX software bootcamp certificate",
  },
});

// profileSchema.methods.showEstablished = function () {
//   return `${this.name} has been serving ${this.city}, ${this.state} since ${this.founded}.`;
// };

module.exports = mongoose.model("Education", educationSchema);
