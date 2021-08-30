const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  //console.log({ name, occupation, catchPhrase });

  Celebrity.create({ name, occupation, catchPhrase })
    .then((newCelebrity) => {
      console.log(`Here is your new celebrity sir ${newCelebrity}`);
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/celebrities/new-celebrity");
    });
});

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("celebrities/celebrities", { allCelebrities });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
