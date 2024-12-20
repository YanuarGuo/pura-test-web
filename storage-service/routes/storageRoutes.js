const express = require("express");
const router = express.Router();
const storageController = require("../controllers/storageController");
const multer = require("multer");
const upload = multer();

// Rute untuk mengunggah file
router.post("/upload", upload.array("files"), storageController.uploadFiles);

// Rute untuk mengambil semua file
router.get("/", storageController.getAllFiles);

// Rute get file menggunakan id
router.get("/info/:id", storageController.infoFile);

// Rute get file menggunakan id
router.get("/:id", storageController.downloadFile);

// Rute untuk mengambil file dengan mencocokan data di database
router.get("/file/:source/:folder/:filename", storageController.downloadFile);

// Rute untuk menghapus file berdasarkan ID
router.delete("/:id", storageController.deleteFile);

module.exports = router;
