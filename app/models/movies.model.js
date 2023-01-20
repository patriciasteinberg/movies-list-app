import sql from "./db.js";

const Movies = function (movie) {
  this.title = movie.title;
  this.description = movie.description;
  this.released = movie.released;
};

Movies.create = (newMovie, result) => {
  sql.query("INSERT INTO movies SET ?", newMovie, (error, res) => {
    if (error) {
      console.log({ error });
      result(error, null);
      return;
    }

    console.log("created movie: ", { id: res.insertId, ...newMovie });
    result(null, { id: res.insertId, ...newMovie });
  });
};

Movies.findById = (id, result) => {
  sql.query("SELECT * FROM movies WHERE id = ?", id, (error, res) => {
    if (error) {
      console.log({ error });
      result(error, null);
      return;
    }

    if (res.length) {
      console.log("found movie: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Movies.getAll = (result) => {
  sql.query("SELECT * FROM movies", (error, res) => {
    if (error) {
      console.log({ error });
      result(null, error);
      return;
    }

    console.log("movies: ", res);
    result(null, res);
  });
};

Movies.updateById = (id, movie, result) => {
  sql.query(
    "UPDATE movies SET title = ?, description = ?, released = ? WHERE id = ?",
    [movie.title, movie.description, movie.released, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated movie: ", { id: id, ...movie });
      result(null, { id: id, ...movie });
    }
  );
};

Movies.remove = (id, result) => {
  sql.query("DELETE FROM movies WHERE id = ?", id, (error, res) => {
    if (error) {
      console.log({ error });
      result(null, error);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted movie with id: ", id);
    result(null, res);
  });
};

Movies.removeAll = (result) => {
  sql.query("DELETE FROM movies", (error, res) => {
    if (error) {
      console.log("error: ", error);
      result(null, error);
      return;
    }

    console.log(`deleted ${res.affectedRows} movies`);
    result(null, res);
  });
};

export default Movies;
