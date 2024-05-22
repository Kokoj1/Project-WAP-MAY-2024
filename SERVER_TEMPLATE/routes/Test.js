var express = require("express");
var router = express.Router();

const testControllers = require("../controllers/test");

router.get("/", testControllers.testGet);

module.exports = router;