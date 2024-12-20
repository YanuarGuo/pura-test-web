const express = require("express");
const router = express.Router();
const userAccessController = require("../controllers/userAccessController");

router.get("/", userAccessController.getAllUserAccesses);
router.post("/", userAccessController.upsertUserAccess);
// router.get("/:id", userAccessController.getUserAccessById);
// router.put("/:id", userAccessController.updateUserAccess);
// router.delete("/:id", userAccessController.deleteUserAccess);

module.exports = router;
