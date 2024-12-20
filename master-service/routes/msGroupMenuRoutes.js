const express = require("express");
const router = express.Router();
const msGroupMenuController = require("../controllers/msGroupMenuController");

router.get("/", msGroupMenuController.getAllMsGroupMenus);
router.get("/:id", msGroupMenuController.getMsGroupMenuById);
router.post("/", msGroupMenuController.createMsGroupMenu);
router.put("/:id", msGroupMenuController.updateMsGroupMenu);
router.delete("/:id", msGroupMenuController.deleteMsGroupMenu);

module.exports = router;
