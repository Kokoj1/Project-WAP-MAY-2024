const Article = require("../models/articles");

exports.getAllArticles = async (req, res) => {
  try {
    const result = await Article.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "Articles found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Articles not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getArticlesById = async (req, res) => {
  try {
    const result = await Article.findById(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Article found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Article not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const result = await Article.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Article deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      heading: req.body.heading,
      body: req.body.body,
      heading2: req.body.heading2,
      body2: req.body.body2,
      reference: req.body.reference,
      author: req.body.author,
    };
    const result = await Article.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        msg: "Article updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Article was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createArticle = async (req, res) => {
  try {
    const data = new Article({
      name: req.body.name,
      heading: req.body.heading,
      body: req.body.body,
      heading2: req.body.heading2,
      body2: req.body.body2,
      reference: req.body.reference,
      author: req.body.author,
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "Article created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Article was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.searchArticlesByName = async (req, res) => {
  try {
    const name = req.query.name;
    const result = await Article.find({ name: { $regex: `.*${name}.*`, $options: "i" } }, 'name'); // Pouze vyhledávání podle jména a vrácení pouze jména
    res.status(200).send({
      msg: "Articles found by name",
      payload: result,
    });
  } catch (error) {
    res.status(500).send({
      msg: "Error while searching articles by name",
      error: error,
    });
  }
};