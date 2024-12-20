const express = require("express");
const router = express.Router();
const servicePathController = require("../controllers/servicePathController"); // Sesuaikan path dengan lokasi controller Anda

// Rute untuk membuat layanan baru
router.post("/", servicePathController.createServicePath);

// Rute untuk mengambil semua layanan
router.get("/", servicePathController.getAllServicePaths);

// Rute untuk mengambil layanan berdasarkan ID
router.get("/:id", servicePathController.getServicePathById);

// Rute untuk mengubah data layanan berdasarkan ID
router.put("/:id", servicePathController.updateServicePath);

// Rute untuk menghapus layanan berdasarkan ID
router.delete("/:id", servicePathController.deleteServicePath);

module.exports = router;
