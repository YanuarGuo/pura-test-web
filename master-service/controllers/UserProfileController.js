const { UserProfile } = require("../models");
var { resSukses, resError } = require("../helpers/response");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const db = require("../models/index");

// exports.getAllUsers = async (req, res) => {
//   try {
//     const decodedJwt = jwt.decode(req.headers["authorization"]);
//     const { ids } = req.query;
//     const whereCondition = { is_active: true };

//     if (ids) {
//       const userIds = ids.split(",");
//       whereCondition.id = { [db.Sequelize.Op.in]: userIds };
//     }
//     let userProfiles;
//     let mergedUsers = [];
//     if (decodedJwt.userPermission.is_read_all) {
//       const getuser = await axios({
//         method: "GET",
//         url: `${process.env.HOST_AUTH}/auth/userData`,
//         params: { ids }, // Use ids from query if is_read_all is true
//       });

//       const externalUsers = Array.isArray(getuser.data.data)
//         ? getuser.data.data
//         : [];

//       userProfiles = await UserProfile.findAll({
//         where: whereCondition,
//         order: [["createdAt", "DESC"]],
//       });

//       mergedUsers = userProfiles.map((profile) => {
//         const userData = externalUsers.find((user) => user.id === profile.id);
//         return {
//           ...profile.dataValues,
//           ...(userData || {}),
//         };
//       });
//     } else {
//       const getuser = await axios({
//         method: "GET",
//         url: `${process.env.HOST_AUTH}/auth/userData`,
//         params: { ids: decodedJwt.userId },
//       });

//       const externalUsers = Array.isArray(getuser.data.data)
//         ? getuser.data.data
//         : [];
//       const userData = externalUsers.find(
//         (user) => user.id === decodedJwt.userId
//       );

//       userProfiles = await UserProfile.findAll({
//         where: { id: decodedJwt.userId, is_active: true },
//         order: [["createdAt", "DESC"]],
//       });

//       mergedUsers = userProfiles.map((profile) => {
//         return {
//           ...profile.dataValues,
//           ...(userData || {}),
//         };
//       });
//     }

//     return resSukses(res, 200, "Berhasil mendapatkan semua User.", mergedUsers);
//   } catch (error) {
//     console.error(error);
//     return resError(res, 500, "Gagal mendapatkan semua User.");
//   }
// };

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
    // const token = req.headers["authorization"];
    // const decoded = jwt.decode(token);
    // const id = decoded.userId;

    // const cekUser = await UserProfile.findByPk(id);
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
