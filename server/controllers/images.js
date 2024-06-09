const mongoose = require("mongoose");
const image = require("../models/image");

const fileStream = require("fs");
const path = require("path");

exports.getAllImages = async (req, res) => {

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

  console.log("update");

  try {

    let formData = {...req.body}

    console.log(req.file);
    console.log(formData);

    if (req.file) {
      const data = await fileStream.promises.readFile(path.join(__dirname, "../uploads", req.file.filename));
      formData = {...formData, img: {
        data: data.toString("base64"),
        contentType: req.file.mimetype
      }};
    }

    console.log(formData);

    const result = await image.findByIdAndUpdate(new mongoose.Types.ObjectId(req.params.id), formData);

    if (result) {

      return res.status(200).send({
        msg: "Image updated",
        payload: result,
      });
    }

    res.status(500).send({ msg: "Something went wrong! Image wasn't updated. Check the ID and the stuff you want to update." });

  } catch (err) {
    console.log(err);
    res.status(500).send("Oh noes. Something went wrong while updating the file.");
  }
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
    res.status(500).send("Oh noes. Something went wrong while processing the file.");
  }
}