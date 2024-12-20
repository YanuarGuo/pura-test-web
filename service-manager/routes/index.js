var express = require("express");
var router = express.Router();

/* GET home page. */
// router.get('/', function (req, res, next) {
//   // return resSukses(res, 200, 'Welcome to App Manager')
//   res.render('index')
// })

const servicesRoutes = require("./serviceRoutes");
router.use("/services", servicesRoutes);

const servicePathsRoutes = require("./servicePathRoutes");
router.use("/service-paths", servicePathsRoutes);

module.exports = router;
