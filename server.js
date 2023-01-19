import { config } from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./app/routes/movies.routes.js";

config();
const app = express();

const corsOptions = {
  origin: process.env.HOST,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the list of movies application" });
});

routes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
