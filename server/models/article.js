const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({

	title: String,
	content: String

});

const article = mongoose.model("Article", articleSchema);

module.exports = article;