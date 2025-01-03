const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

router.get("/", reservationController.getAllReservation);
router.get("/jwt", reservationController.getAllReservationJWT);
router.get("/:id", reservationController.getReservationById);

router.post("/", reservationController.createReservation);

router.put("/validasi", reservationController.adminValidation);
router.put("/:id", reservationController.updateReservation);

router.delete("/:id", reservationController.deleteReservation);

module.exports = router;
