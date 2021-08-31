const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

const Movie = require("../models/movies.model");

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("movies/new-movie", { allCelebrities });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/create", (req, res, next) => {
  const { title, plot, genre, cast } = req.body;
  //console.log({ title, plot, genre, cast });
  Movie.create({ title, plot, genre, cast })
    .then((newMovie) => {
      console.log(`Here is your new movie sir ${newMovie}`);
      res.redirect("/movies/create");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/", (req, res, next) => {
  Movie.find()
    .then((allMovies) => {
      console.log(`Here are your movies sir ${allMovies}`);
      res.render("movies/movies", { allMovies });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
