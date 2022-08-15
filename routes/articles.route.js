const express = require("express");

const Article = require("../models/articles.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const articles = Article.find({}).sort({ createdAt: "desc" });
  res.render("articles/index", { articles });
});

router.get("/new", (req, res) => {
  res.render("articles/new");
});

router.post("/", async (req, res) => {
  const { title, description, markdown } = req.body;

  try {
    const article = new Article({
      title,
      description,
      markdown,
    });
    await article.save();
  } catch (error) {
    console.log(error);
    res.redirect("/articles/new");
  }
});

module.exports = router;
