const express = require("express");

const Article = require("../models/articles.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const articles = await Article.find({}).sort({ createdAt: "desc" });
  res.render("articles/index", { articles });
});

router.get("/new", (req, res) => {
  res.render("articles/new");
});

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article });
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
    res.redirect(`articles/${newArticle.slug}`);
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

router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/articles");
});

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("articles/show", { article });
});

module.exports = router;
