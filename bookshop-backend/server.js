const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const booksRoute = require("./routes/booksRoute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

app.use("/books", booksRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
