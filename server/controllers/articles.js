const mongoose = require("mongoose");
const article = require("../models/article");

exports.getAllArticles = async (req, res) => {

  try {

    const result = await article.find();

    if (result) {

      return res.status(200).send({
        msg: "Articles successfully retrieved!",
        payload: result,
      });
    }

    res.status(404).send({ msg: "Articles couldn't be retrived!" });

  } catch (error) {

    res.status(500).send(error);

  }
};

exports.getArticleById = async (req, res) => {

  try {

    const result = await article.findById(new mongoose.Types.ObjectId(req.params.id));

    if (result) {

      return res.status(200).send({
        msg: "Article found!",
        payload: result,
      });
    }

    res.status(404).send({ msg: `Article with ID ${req.params.id} cannot be found!` });

  } catch (error) {

    res.status(500).send(error);

  }
};

exports.deleteArticle = async (req, res) => {

  try {

    const result = await article.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id));

    if (result) {

      return res.status(200).send({
        msg: "Article successfully deleted"
      });
    }

    res.status(500).send({ msg: "Something went wrong, are you sure the ID is correct?" });

  } catch (error) {

    res.status(500).send(error);

  }
};

exports.updateArticle = async (req, res) => {

  try {

    const result = await article.findByIdAndUpdate(new mongoose.Types.ObjectId(req.params.id), req.body);

    if (result) {

      return res.status(200).send({
        msg: "Article updated",
        payload: result,
      });
    }

    res.status(500).send({ msg: "Something went wrong! Article wasn't updated. Check the ID and the stuff you want to update." });

  } catch (error) {

    res.status(500).send(error);

  }
};

exports.createArticle = async (req, res) => {

  try {

    const body = req.body;

    const newArticle = new article({

      title: body.title,
      content: body.content

    });

    const result = await newArticle.save();

    console.log(`The ID of the new document is: ${result._id}`);

    if (result) {

      return res.status(201).send({
        msg: "Article created",
        payload: result
      });
    }

    res.status(500).send({ msg: "Couldn't create article!" });

  } catch (error) {

    res.status(500).send(error);

  }
};

// Will rework later

exports.searchArticlesByName = async (req, res) => {

  try {

    //const name = req.query.name;

    const result = {};//await Article.find({ name: { $regex: `.*${name}.*`, $options: "i" } }, 'name'); // Pouze vyhledávání podle jména a vrácení pouze jména

    res.status(200).send({
      msg: "Articles found by name",
      payload: result,
    });

  } catch (error) {

    res.status(500).send({ msg: "Error while searching articles by name", error: error, });

  }
};
