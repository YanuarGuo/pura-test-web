var express = require("express");
var router = express.Router();

// Gunakan route yang telah diatur

// Role
const msRoleRoutes = require("./msRoleRoutes");
router.use("/roles", msRoleRoutes);

// Group Menu
const msGroupMenuRoutes = require("./msGroupMenuRoutes");
router.use("/group-menus", msGroupMenuRoutes);

// Jenis Tiket
const msRoomRoutes = require("./msRoomRoutes");
router.use("/rooms", msRoomRoutes);

// Menu
const msMenuRoutes = require("./msMenuRoutes");
router.use("/menus", msMenuRoutes);

// Role Menu
const msRoleMenuRoutes = require("./msRoleMenuRoutes");
router.use("/role-menus", msRoleMenuRoutes);

// User Access
const userAccessRoutes = require("./userAccessRoutes");
router.use("/user-access", userAccessRoutes);

// User Profile
const userProfileRoutes = require("./userProfileRoutes");
router.use("/user-profiles", userProfileRoutes);

module.exports = router;
