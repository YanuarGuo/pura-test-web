const express = require("express");
const router = express.Router();
const {
  register,
  logout,
  login,
  refresh,
  verifyToken,
  forgotPassword,
  resetPassword,
  updateUser,
  getUserAuthData,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/verify", verifyToken);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);
router.post("/logout", logout);
router.put("/user", updateUser);
router.get("/userData", getUserAuthData);

module.exports = router;
