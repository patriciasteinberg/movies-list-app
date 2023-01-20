import Movie from "../models/movies.model.js";

export const createMovie = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }

  const { title, description, released } = req.body;

  const movie = new Movie({
    title,
    description,
    released,
  });

  Movie.create(movie, (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || "An error occurred while creating the movie",
      });
    } else {
      res.send(data);
    }
  });
};

export const findAllMovies = (req, res) => {
  Movie.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving movies.",
      });
    } else {
      res.send(data);
    }
  });
};

export const findOneMovie = (req, res) => {
  Movie.findById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          message: `Not found: movie with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving movie with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

export const updateMovie = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Movie.updateById(req.params.id, new Movie(req.body), (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          message: `Not found: movie with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating movie with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

export const deleteMovie = (req, res) => {
  Movie.remove(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          message: `Not found: movie with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete movie with id " + req.params.id,
        });
      }
    } else res.send({ message: `Movie was deleted successfully!` });
  });
};

export const deleteAllMovies = (req, res) => {
  Movie.removeAll((error, data) => {
    if (error)
      res.status(500).send({
        message:
          error.message || "Some error occurred while removing all movies.",
      });
    else res.send({ message: `All movies were deleted successfully!` });
  });
};
