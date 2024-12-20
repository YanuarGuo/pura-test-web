const { UserProfile } = require("../models");
var { resSukses, resError } = require("../helpers/response");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const decodedJwt = jwt.decode(req.headers["authorization"]);

    let user;
    if (decodedJwt.userPermission.is_read_all) {
      user = await UserProfile.findAll({
        where: { is_active: true },
        order: [["createdAt", "DESC"]],
      });
    } else {
      user = await UserProfile.findAll({
        where: { id: decodedJwt.userId, is_active: true },
        order: [["createdAt", "DESC"]],
      });
    }

    return resSukses(res, 200, "Berhasil mendapatkan semua User.", user);
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan semua User.");
  }
};

exports.getAllUserProfiles = async (req, res) => {
  try {
    let token = req.headers["authorization"];
    if (token.includes("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.decode(token);
    const userId = decoded.userId;

    const userProfiles = await UserProfile.findAll({
      where: { is_active: true, id: userId },
    });

    return resSukses(
      res,
      200,
      "Berhasil mendapatkan semua User Profile.",
      userProfiles
    );
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan semua User Profile.");
  }
};

exports.getUserProfileById = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({
      where: { id: req.params.id, is_active: true },
    });
    if (!userProfile) {
      return resError(res, 404, "User Profile tidak ditemukan.");
    }
    return resSukses(
      res,
      200,
      "Berhasil mendapatkan User Profile.",
      userProfile
    );
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan User Profile.");
  }
};

exports.createUserProfile = async (req, res) => {
  try {
    const cekUser = await UserProfile.findByPk(req.body.id);

    if (cekUser) {
      return resError(res, 403, "User Profile sudah dibuat.");
    }

    // const profileData = { ...req.body };
    const userProfile = await UserProfile.create(
      req.body,
      req.sequelizeOptions
    );
    return resSukses(
      res,
      201,
      "Berhasil membuat User Profile baru.",
      userProfile
    );
  } catch (error) {
    return resError(res, 500, "Gagal membuat User Profile baru.");
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({
      where: { id: req.params.id, is_active: true },
    });
    if (!userProfile) {
      return resError(res, 404, "User Profile tidak ditemukan.");
    }
    await userProfile.update(req.body, req.sequelizeOptions);
    return resSukses(
      res,
      200,
      "Berhasil memperbarui User Profile.",
      userProfile
    );
  } catch (error) {
    return resError(res, 500, "Gagal memperbarui User Profile.");
  }
};

exports.deleteUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({
      where: { id: req.params.id, is_active: true },
    });
    if (!userProfile) {
      return resError(res, 404, "User Profile tidak ditemukan.");
    }
    await userProfile.update({ is_active: false }, req.sequelizeOptions);
    return resSukses(res, 204, "Berhasil menghapus User Profile.");
  } catch (error) {
    return resError(res, 500, "Gagal menghapus User Profile.");
  }
};
