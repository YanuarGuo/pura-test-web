const express = require("express");
const router = express.Router();
const msMenuController = require("../controllers/msMenuController");

router.get("/", msMenuController.getAllMsMenus);
router.get("/:id", msMenuController.getMsMenuById);
router.post("/", msMenuController.createMsMenu);
router.put("/:id", msMenuController.updateMsMenu);
router.delete("/:id", msMenuController.deleteMsMenu);

module.exports = router;
