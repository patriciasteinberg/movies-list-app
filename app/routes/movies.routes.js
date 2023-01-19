import {
  createMovie,
  deleteMovie,
  deleteAllMovies,
  findAllMovies,
  findOneMovie,
  updateMovie,
} from "../controller/movies.controller.js";
import { Router } from "express";

const routes = (app) => {
  const router = Router();

  router.post("/", createMovie);
  router.get("/", findAllMovies);
  router.get("/:id", findOneMovie);
  router.put("/:id", updateMovie);
  router.delete("/:id", deleteMovie);
  router.delete("/", deleteAllMovies);

  app.use("/api/movies", router);
};

export default routes;
