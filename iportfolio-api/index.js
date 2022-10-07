// Modules and Globals

require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


// Controllers and Routes
app.use("/profiles", require("./controllers/profile_controller.js"));

app.get("/", async (req, res) => {
  res.render("home");
});

app.get("*", async (req, res) => {
  res.render("error404");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
