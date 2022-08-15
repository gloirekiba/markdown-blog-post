require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const articlesRouter = require("./routes/articles.route");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(express.json());

app.use("/articles", articlesRouter);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
