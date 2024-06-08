const mongoose = require("mongoose");
const image = require("../models/image");

const fileStream = require("fs");
const path = require("path");

exports.getAllImages = async (req, res) => {

  console.log("Get all");

  try {

    const result = await image.find();

    if (result) {

      return res.status(200).send({
        msg: "Images successfully retrieved!",
        payload: result
      });
    }

    res.status(404).send({ msg: "Images couldn't be retrived!" });

  } catch (err) {

    res.status(500).send(err);

  }
};

exports.fetchImage = async (req, res) => {

  try {

    const result = await image.findById(new mongoose.Types.ObjectId(req.params.id));

    console.log(result.img.data);

    if (result) {

      res.setHeader("Content-Type", result.img.contentType);
      res.send(Buffer.from(result.img.data, "base64"));
      return;
    }

    res.status(404).send({msg: `Can't find image with ID ${req.params.id}`});
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.getImageById = async (req, res) => {
  
  try {

    const result = await image.findById(new mongoose.Types.ObjectId(req.params.id));

    if (result) {

      return res.status(200).send({
        msg: "Image found!",
        payload: result
      });
    }

    res.status(404).send({msg: `Can't find image with ID ${req.params.id}`});
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteImage = async (req, res) => {

  try {

    const result = await image.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id));

    if (result) {

      return res.status(200).send({
        msg: "Image successfully deleted"
      });
    }

    res.status(500).send({ msg: "Something went wrong, are you sure the ID is correct?" });

  } catch (err) {

    res.status(500).send(err);

  }
};

exports.updateImage = async (req, res) => {
  console.log("Update image");
};

exports.createImage = async (req, res, next) => {

  if (!req.file) return next(new Error("No file uploaded"));

  const body = req.body;
  const file = req.file;

  try {
    const data = await fileStream.promises.readFile(path.join(__dirname, "../uploads", file.filename));

    console.log(data.toString("base64"));

    const newImage = new image({
      name: body.name,
      description: body.description,
      copyright: body.copyright,
      img: {
        data: data.toString("base64"),
        contentType: file.mimetype
      }
    });

    const result = await newImage.save();

    if (result) {

      return res.status(201).send({
        msg: "Image saved",
        payload: result
      });
    }

    return res.status(500).send({msg: "Couldn't save the image"});

  } catch (err) {
    console.log(err);
    res.status(500).send("Oh noes. Something went wrong while processing the file.");
  }
}