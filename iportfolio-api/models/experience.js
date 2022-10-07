const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    default: "HighTech Company",
  },
  title: {
    type: String,
    default: "Software Engineer",
  },
  skills: {
    type: String,
    default: "HTML, CSS, Javascript, Node.js, React, Redux, MongoDB",
  },
  description: {
    type: String,
    default: "Built full-stack websites",
  },
});

// profileSchema.methods.showEstablished = function () {
//   return `${this.name} has been serving ${this.city}, ${this.state} since ${this.founded}.`;
// };

module.exports = mongoose.model("Experience", experienceSchema);
