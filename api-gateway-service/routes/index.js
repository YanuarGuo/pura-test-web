var express = require("express");
var router = express.Router();
var { resSukses } = require("../helpers/response");

/* GET home page. */
router.get("/", function (req, res, next) {
  return resSukses(res, 200, "Welcome to Gateway");
});

module.exports = router;
