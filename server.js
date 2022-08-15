require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
