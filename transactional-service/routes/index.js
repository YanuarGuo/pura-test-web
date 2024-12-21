var express = require("express");
var router = express.Router();

// Role
const reservationRoutes = require("./reservationRoutes");
router.use("/reservation", reservationRoutes);

module.exports = router;
