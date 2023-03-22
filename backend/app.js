var express = require("express");
var cors = require("cors");

var app = express();

app.use(cors());

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send({ msg: "React Client connected to the Express server!" });
});

app.listen(port, () => {
  console.log(`App Listening at http://localhost:${port}`);
});

module.exports = app;
