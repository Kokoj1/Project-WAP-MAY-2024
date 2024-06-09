var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer({dest: "uploads/"});

const imagesController = require("../controllers/images");

router.get("/", imagesController.getAllImages);

router.get("/:id", imagesController.fetchImage);

router.get("/:id/:view", imagesController.getImageById);

router.delete("/:id", imagesController.deleteImage);

router.put("/:id", upload.single("image"), imagesController.updateImage);

router.post("/", upload.single("image"), imagesController.createImage);

module.exports = router;