var express = require("express");
var router = express.Router();

// Gunakan route yang telah diatur
const storageRoutes = require("./storageRoutes");
router.use("/storages", storageRoutes);

module.exports = router;
