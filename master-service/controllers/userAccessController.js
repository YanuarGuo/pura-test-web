const {
  UserAccess,
  MsMenu,
  MsRole,
  MsGroupMenu,
  UserProfile,
} = require("../models");
var { resSukses, resError } = require("../helpers/response");
const jwt = require("jsonwebtoken");

exports.getAllUserAccesses = async (req, res) => {
  try {
    const { menu_id, service_path_id, user_id } = req.query;
    const whereCondition = {};

    let token = req.headers["authorization"];

    if (token.includes("Bearer ")) {
      token = token.split(" ")[1];
    }

    const userJWT = jwt.decode(token);

    if (userJWT?.userId) {
      whereCondition.user_id = user_id ? user_id : userJWT.userId;
    }

    if (menu_id) {
      whereCondition.menu_id = menu_id;
    }

    if (service_path_id) {
      whereCondition["$menu.service_path_id$"] = service_path_id;
    }

    const userAccesses = await UserAccess.findAll({
      where: whereCondition,
      include: [
        {
          model: MsMenu,
          as: "menu",
          include: [
            {
              model: MsGroupMenu,
              as: "group_menu",
            },
          ],
        },
        {
          model: MsRole,
          as: "role",
        },
        {
          model: UserProfile,
        },
      ],
    });

    return resSukses(
      res,
      200,
      "Berhasil mendapatkan semua User Access.",
      userAccesses
    );
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan semua User Access.");
  }
};

// exports.getUserAccessById = async (req, res) => {
//   try {
//     const userAccess = await UserAccess.findByPk(req.params.id, {
//       include: [
//         {
//           model: MsMenu,
//           as: "menu",
//           include: [
//             {
//               model: MsGroupMenu,
//               as: "group_menu",
//             },
//           ],
//         },
//         {
//           model: MsRole,
//           as: "role",
//         },
//       ],
//     });
//     if (!userAccess) {
//       return resError(res, 404, "User Access tidak ditemukan.");
//     }
//     return resSukses(res, 200, "Berhasil mendapatkan User Access.", userAccess);
//   } catch (error) {
//     return resError(res, 500, "Gagal mendapatkan User Access.");
//   }
// };

exports.upsertUserAccess = async (req, res) => {
  try {
    const data = req.body;

    let userAccess;

    req.sequelizeOptions.conflictFields = ["user_id", "menu_id"];

    if (Array.isArray(data)) {
      const temp = data.map(async (d) => {
        // Cek apakah user access ada
        const cek = await UserAccess.findOne({
          where: { user_id: d.user_id, menu_id: d.menu_id },
        });

        // Set createdBy dan updatedBy
        if (cek) {
          d.updatedBy = req.sequelizeOptions.userId;
        } else {
          d.createdBy = req.sequelizeOptions.userId;
          d.updatedBy = req.sequelizeOptions.userId;
        }

        // upsert
        const [instance, created] = await UserAccess.upsert(
          d,
          req.sequelizeOptions
        );

        return instance;
      });

      userAccess = await Promise.all(temp);
    } else {
      // Cek apakah user access ada
      const cek = await UserAccess.findOne({
        where: { user_id: data.user_id, menu_id: data.menu_id },
      });

      // Set createdBy dan updatedBy
      if (cek) {
        data.updatedBy = req.sequelizeOptions.userId;
      } else {
        data.createdBy = req.sequelizeOptions.userId;
        data.updatedBy = req.sequelizeOptions.userId;
      }

      [userAccess, created] = await UserAccess.upsert(
        data,
        req.sequelizeOptions
      );
    }

    return resSukses(res, 201, "Berhasil memperbarui User Access.", userAccess);
  } catch (error) {
    return resError(res, 500, "Gagal membuat User Access baru.");
  }
};

// exports.updateUserAccess = async (req, res) => {
//   try {
//     const userAccess = await UserAccess.findOne({
//       where: { user_id: req.params.id },
//     });

//     if (!userAccess) {
//       return resError(res, 404, "User Access tidak ditemukan.");
//     }

//     await userAccess.bulkUpdate(req.body, req.sequelizeOptions);
//     return resSukses(res, 200, "Berhasil memperbarui User Access.", userAccess);
//   } catch (error) {
//     return resError(res, 500, "Gagal memperbarui User Access.");
//   }
// };

// exports.deleteUserAccess = async (req, res) => {
//   try {
//     const userAccess = await UserAccess.findByPk(req.params.id);
//     if (!userAccess) {
//       return resError(res, 404, "User Access tidak ditemukan.");
//     }
//     await userAccess.destroy();
//     return resSukses(res, 200, "Berhasil menghapus User Access.");
//   } catch (error) {
//     return resError(res, 500, "Gagal menghapus User Access.");
//   }
// };
