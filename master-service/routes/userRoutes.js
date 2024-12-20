const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/UserProfileController");

// Rute untuk mendapatkan semua profil pengguna
router.get("/", userProfileController.getAllUsers);

module.exports = router;
