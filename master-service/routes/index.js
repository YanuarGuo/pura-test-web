var express = require("express");
var router = express.Router();

// Gunakan route yang telah diatur

// Group Menu
const msGroupMenuRoutes = require("./msGroupMenuRoutes");
router.use("/group-menus", msGroupMenuRoutes);

// Room
const msRoomRoutes = require("./msRoomRoutes");
router.use("/rooms", msRoomRoutes);

// Menu
const msMenuRoutes = require("./msMenuRoutes");
router.use("/menus", msMenuRoutes);

// User Access
const userAccessRoutes = require("./userAccessRoutes");
router.use("/user-access", userAccessRoutes);

// User Profile
const userProfileRoutes = require("./userProfileRoutes");
router.use("/user-profiles", userProfileRoutes);

const userRoutes = require("./userRoutes");
router.use("/users", userRoutes);

module.exports = router;
