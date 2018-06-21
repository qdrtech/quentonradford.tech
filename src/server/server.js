const express = require("express");
const os = require("os");
const app = express();

app.use(express.static("build"));

app.listen(8080, () => console.log("Listening on port 8080!"));