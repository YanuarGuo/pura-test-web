const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController"); // Sesuaikan path dengan lokasi controller Anda

// Rute untuk membuat layanan baru
router.post("/", serviceController.createService);

// Rute untuk mengambil semua layanan
router.get("/", serviceController.getAllServices);

// Rute untuk mengambil layanan berdasarkan ID
router.get("/:id", serviceController.getServiceById);

// Rute untuk mengubah data layanan berdasarkan ID
router.put("/:id", serviceController.updateService);

// Rute untuk menghapus layanan berdasarkan ID
router.delete("/:id", serviceController.deleteService);

module.exports = router;
