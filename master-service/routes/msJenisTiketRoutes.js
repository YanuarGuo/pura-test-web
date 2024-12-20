const express = require("express");
const router = express.Router();
const msJenisTiketController = require("../controllers/msJenisTiketController");

router.get("/", msJenisTiketController.getAllMsJenisTikets);
router.get("/:id", msJenisTiketController.getMsJenisTiketById);
router.post("/", msJenisTiketController.createMsJenisTiket);
router.put("/:id", msJenisTiketController.updateMsJenisTiket);
router.delete("/:id", msJenisTiketController.deleteMsJenisTiket);

module.exports = router;
