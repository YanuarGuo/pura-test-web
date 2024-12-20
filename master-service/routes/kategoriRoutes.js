const express = require("express");
const router = express.Router();
const KategoriController = require("../controllers/KategoriController");

router.get("/", KategoriController.getAllKategori);
router.get("/:id", KategoriController.getKategoriById);
router.post("/", KategoriController.createKategori);
router.put("/:id", KategoriController.updateKategori);
router.delete("/:id", KategoriController.deleteKategori);

module.exports = router;
