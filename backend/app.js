var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const employeeRouter = require("./src/routes/employee");

app.use("/employee", employeeRouter);
app.get("/", (req, res) => {
  res.send({ msg: "React Client connected to the Express server!" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App Listening at http://localhost:${port}`);
});

module.exports = app;
