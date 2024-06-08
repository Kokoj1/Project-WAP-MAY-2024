const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({

  name: String,
  description: String,
  copyright: String,
  img: {
    data: String,
    contentType: String
  }

});

const image = mongoose.model("Image", imageSchema);

module.exports = image;