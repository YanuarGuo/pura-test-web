const express = require("express");
const router = express.Router();
const UserProfileController = require("../controllers/UserProfileController");

// Rute untuk mendapatkan semua profil pengguna
router.get("/", UserProfileController.getAllUserProfiles);

// Rute untuk mendapatkan profil pengguna berdasarkan ID
router.get("/:id", UserProfileController.getUserProfileById);

// Rute untuk membuat profil pengguna baru
router.post("/", UserProfileController.createUserProfile);

// Rute untuk memperbarui profil pengguna
router.put("/:id", UserProfileController.updateUserProfile);

// Rute untuk menghapus profil pengguna
router.delete("/:id", UserProfileController.deleteUserProfile);

module.exports = router;
