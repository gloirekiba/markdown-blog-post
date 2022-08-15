const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
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
  res.render("articles/index", { articles });
});

router.get("/new", (req, res) => {
  res.render("articles/new");
});

module.exports = router;
