var express = require("express");
var router = express.Router();

const testControllers = require("../controllers/test");

router.get("/", testControllers.testGet);

router.put("/", testControllers.testPut);

module.exports = router;