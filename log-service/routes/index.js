var express = require("express");
var router = express.Router();

const logRoutes = require("./logRoutes");
router.use("/logs", logRoutes);

module.exports = router;
