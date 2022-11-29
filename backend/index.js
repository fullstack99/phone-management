const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const contactRoute = require("./routes/contact");

const app = express();
app.use(bodyParser.text({ type: "text/json" }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/api", contactRoute);

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "API works",
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Connected to port " + port);
});

// 404 Error
app.use((req, res, next) => {
  res.status(404).send("Error 404!");
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
