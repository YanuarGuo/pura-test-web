const express = require("express");
const router = express.Router();
const msRoomController = require("../controllers/msRoomController");

router.get("/", msRoomController.getAllRooms);
router.get("/:id", msRoomController.getRoomById);
router.post("/", msRoomController.createRoom);
router.put("/:id", msRoomController.updateRoom);
router.delete("/:id", msRoomController.deleteRoom);

module.exports = router;
