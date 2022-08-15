const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const articles = [
    {
      title: "Article 1",
      createdAt: new Date(),
      description: "Article 1 description",
    },
    {
      title: "Article 2",
      createdAt: new Date(),
      description: "This is the content of article 2.",
    },
  ];
  res.render("articles/index", { articles });
});

router.get("/new", (req, res) => {
  res.render("articles/new");
});

module.exports = router;
