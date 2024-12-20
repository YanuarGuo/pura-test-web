const express = require("express");
const router = express.Router();
const msRoleMenuController = require("../controllers/msRoleMenuController");

router.get("/", msRoleMenuController.getAllMsRoleMenus);
router.post("/", msRoleMenuController.upsertMsRoleMenu);
// router.get("/:id", msRoleMenuController.getMsRoleMenuById);
// router.put("/:id", msRoleMenuController.updateMsRoleMenu);
// router.delete("/:id", msRoleMenuController.deleteMsRoleMenu);

module.exports = router;
