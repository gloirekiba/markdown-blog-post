const mongoose = require("mongoose");
const slugify = require("slugify");
const marked = require("marked");
const { JSDOM } = require("jsdom");
const dompurify = require("dompurify")(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    imnutable: true,
  },
  slug: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});

articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
  }

  next();
});

module.exports = mongoose.model("Article", articleSchema);
