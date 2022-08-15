require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");

const articlesRouter = require("./routes/articles.route");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(express.json());

app.use("/articles", articlesRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
