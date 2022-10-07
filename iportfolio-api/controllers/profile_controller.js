const router = require("express").Router();
const db = require("../models");
const Profile_Seed = require("../models/data/profiles_seed");
const PortfolioSeed = require("../models/data/portfolio_seed");

// SEED PROFILES

router.get("/data/seed", async (req, res) => {
  const profiles = Profile_Seed;
  await db.Profile.insertMany(profiles);
  res.redirect("/profiles");
});

// SEED PORTFOLIO

router.get("/:id/portfolio/data/seed", async (req, res) => {
  const id = req.params.id;
  const projectData = PortfolioSeed;

  const foundProfile = await db.Profile.findById(id);
  // console.log(foundProfile.id);
  const newProject = await db.Project.create(projectData);
  foundProfile.portfolio.push(newProject.id);
  const savedProfile = await foundProfile.save();
  res.redirect(`/profiles/${id}`);
});

// CREATE

router.post("/", async (req, res) => {
  if (!req.body.photo) {
    req.body.photo = undefined;
  }

  try {
    const newProfile = await db.Profile.create(req.body);
    res.redirect("/places");
  } catch (err) {
    trace(err.name)(err);
    if (err && err.name == "ValidationError") {
      let message = "";
      for (let field in err.errors) {
        message += `${field} was ${err.errors[field].value}. `;
        message += `${err.errors[field].message}`;
      }
      res.redirect(`/profiles/${newProfile.id}`);
      // const body = req.body;
      // res.render('places/new', {
      //    message,
      //    body
      // })
    } else {
      res.render("error404");
    }
  }
});

// RETRIEVE - PROFILE

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const foundProfile = await db.Profile.findById(id)
    .populate("education")
    .populate("experience")
    .populate("portfolio");

  res.json(foundProfile);
});

// RETRIEVE - INDEX

router.get("/", async (req, res) => {
  const places = await db.Profile.find();
  res.json(places);
});

// UPDATE

router.put("/:id/project/:projectId", async (req, res) => {
  const id = req.params.id;
  const projectId = req.params.projectId;
  const body = req.body;
  console.log(projectId);
  console.log(body);

  const updatedProject = await db.Project.findByIdAndUpdate(projectId, body, {
    new: true,
  });
  res.status(200).send({ id });
});

// UPDATE

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  console.log(body);

  const updatedProfile = await db.Profile.findByIdAndUpdate(id, body, {
    new: true,
  });
  res.status(200).send({ id });
});

// DELETE (PLACE)

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const deletedProfile = await db.Profile.findByIdAndDelete(id);
  res.status(303).redirect("/profiles");
});

// CREATE - NEW (education)

router.post("/:id/education", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const foundProfile = await db.Profile.findById(id);
  const newEducation = await db.Education.create(body);
  foundProfile.education.push(newEducation.id);
  const savedProfile = await foundProfile.save();
  res.redirect(`/profiles/${id}`);
});

// CREATE - NEW (experience)

router.post("/:id/experience", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const foundProfile = await db.Profile.findById(id);
  const newExperience = await db.Experience.create(body);
  foundProfile.experience.push(newExperience.id);
  const savedProfile = await foundProfile.save();
  res.redirect(`/profiles/${id}`);
});

// CREATE - NEW (project)

router.post("/:id/project", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const foundProfile = await db.Profile.findById(id);
  const newProject = await db.Project.create(body);
  foundProfile.project.push(newProject.id);
  const savedProfile = await foundProfile.save();
  res.redirect(`/profiles/${id}`);
});

router.get("*", async (req, res) => {
  const error = "404 - resource not found";

  res.send(error);
});

module.exports = router;
