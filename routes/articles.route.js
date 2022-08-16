const express = require("express");

const Article = require("../models/articles.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const articles = await Article.find({}).sort({ createdAt: "desc" });
  console.log(articles);
  res.render("articles/index", { articles });
});

router.get("/new", (req, res) => {
  res.render("articles/new");
});

router.post("/", async (req, res) => {
  const { title, description, markdown } = req.body;

  try {
    const newArticle = new Article({
      title,
      description,
      markdown,
    });
    await newArticle.save();
    res.redirect(`articles/${newArticle.id}`);
  } catch (error) {
    console.log(error);
    res.render("articles/new", {
      alert: {
        type: "danger",
        message: error.message,
      },
    });
  }
});

router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article == null) res.redirect("/");
  res.render("articles/show", { article });
});

module.exports = router;
