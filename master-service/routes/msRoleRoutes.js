const express = require("express");
const router = express.Router();
const msRoleController = require("../controllers/msRoleController");

router.get("/", msRoleController.getAllMsRoles);
router.get("/:id", msRoleController.getMsRoleById);
router.post("/", msRoleController.createMsRole);
router.put("/:id", msRoleController.updateMsRole);
router.delete("/:id", msRoleController.deleteMsRole);

module.exports = router;
