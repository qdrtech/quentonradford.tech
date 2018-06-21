import express, { static } from "express";
import cors from "cors";
const app = express();

app.use(cors());

app.use(static("build"));

app.listen(8080, () => console.log("Listening on port 8080!"));