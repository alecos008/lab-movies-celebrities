const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

const Movie = require("../models/movies.model");

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("movies/new-movie", { allCelebrities });
    })
    .catch((err) => {
      next(err);
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
      next(err);
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
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      console.log(`Here is your movie sir ${movie}`);
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => {
      next(err);
    });
});
router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      Celebrity.find()
        .then((castCelebrities) => {
          res.render("movies/edit-movie", { movie, castCelebrities });
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/:id", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  const { id } = req.params;
  Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
    .then((updatedMovie) => {
      console.log(`Here is your updated movie sir ${updatedMovie}`);
      res.redirect(`/movies/${id}`);
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
