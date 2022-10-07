const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "HighTech Company",
  },
  description: {
    type: String,
    default: "Software Engineer",
  },
  tech: {
    type: String,
    default: "HTML, CSS, Javascript, Node.js, React, Redux, MongoDB",
  },
  url: {
    type: String,

  },
  imageUrl: {
    type: String,
  },
});

// profileSchema.methods.showEstablished = function () {
//   return `${this.name} has been serving ${this.city}, ${this.state} since ${this.founded}.`;
// };

module.exports = mongoose.model("Project", projectSchema);
