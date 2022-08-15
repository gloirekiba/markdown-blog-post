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
  const articles = [
    {
      title: "Article 1",
      createdAt: new Date(),
      content:
        "This is the content of article 1 and it is very interesting indeed.",
    },
    {
      title: "Article 2",
      createdAt: new Date(),
      content:
        "This is the content of article 2 and it is very interesting indeed.",
    },
  ];
  res.render("index", { articles });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
