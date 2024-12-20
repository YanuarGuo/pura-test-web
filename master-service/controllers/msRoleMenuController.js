const { MsRoleMenu, MsRole, MsMenu } = require("../models");
var { resSukses, resError } = require("../helpers/response");

exports.getAllMsRoleMenus = async (req, res) => {
  try {
    const { role_id } = req.query;
    const whereCondition = {};

    if (role_id) {
      whereCondition.role_id = role_id;
    }

    const msRoleMenus = await MsRoleMenu.findAll({
      where: whereCondition,
      include: [
        { model: MsRole, as: "role" },
        { model: MsMenu, as: "menu" },
      ],
    });

    return resSukses(
      res,
      200,
      "Berhasil mendapatkan semua Master Role Menu.",
      msRoleMenus
    );
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan semua Master Role Menu.");
  }
};

// exports.getMsRoleMenuById = async (req, res) => {
//   try {
//     const msRoleMenu = await MsRoleMenu.findByPk(req.params.id, {
//       include: [
//         { model: MsRole, as: "role" },
//         { model: MsMenu, as: "menu" },
//       ],
//     });
//     if (!msRoleMenu) {
//       return resError(res, 404, "Master Role Menu tidak ditemukan.");
//     }
//     return resSukses(
//       res,
//       200,
//       "Berhasil mendapatkan Master Role Menu.",
//       msRoleMenu
//     );
//   } catch (error) {
//     return resError(res, 500, "Gagal mendapatkan Master Role Menu.");
//   }
// };

exports.upsertMsRoleMenu = async (req, res) => {
  try {
    const data = req.body;

    let msRoleMenu;

    req.sequelizeOptions.conflictFields = ["role_id", "menu_id"];

    if (Array.isArray(data)) {
      const temp = data.map(async (d) => {
        // Cek apakah user access ada
        const cek = await MsRoleMenu.findOne({
          where: { role_id: d.role_id, menu_id: d.menu_id },
        });

        // Set createdBy dan updatedBy
        if (cek) {
          d.updatedBy = req.sequelizeOptions.userId;
        } else {
          d.createdBy = req.sequelizeOptions.userId;
          d.updatedBy = req.sequelizeOptions.userId;
        }

        // upsert
        const [instance, created] = await MsRoleMenu.upsert(
          d,
          req.sequelizeOptions
        );

        return instance;
      });

      msRoleMenu = await Promise.all(temp);
    } else {
      // Cek apakah user access ada
      const cek = await MsRoleMenu.findOne({
        where: { role_id: data.role_id, menu_id: data.menu_id },
      });

      // Set createdBy dan updatedBy
      if (cek) {
        data.updatedBy = req.sequelizeOptions.userId;
      } else {
        data.createdBy = req.sequelizeOptions.userId;
        data.updatedBy = req.sequelizeOptions.userId;
      }

      [msRoleMenu, created] = await MsRoleMenu.upsert(
        data,
        req.sequelizeOptions
      );
    }

    return resSukses(res, 201, "Berhasil memperbarui Role Menu.", msRoleMenu);
  } catch (error) {
    return resError(
      res,
      500,
      error.errors
        ? error.errors.map((e) => e.message)
        : `Gagal membuat Master Role Menu baru.`
    );
  }
};

// exports.updateMsRoleMenu = async (req, res) => {
//   try {
//     const msRoleMenu = await MsRoleMenu.findByPk(req.params.id);
//     if (!msRoleMenu) {
//       return resError(res, 404, "Master Role Menu tidak ditemukan.");
//     }
//     await msRoleMenu.update(req.body, req.sequelizeOptions);
//     return resSukses(
//       res,
//       200,
//       "Berhasil memperbarui Master Role Menu.",
//       msRoleMenu
//     );
//   } catch (error) {
//     return resError(
//       res,
//       500,
//       error.errors
//         ? error.errors.map((e) => e.message)
//         : `Gagal memperbarui Master Role Menu.`
//     );
//   }
// };

// exports.deleteMsRoleMenu = async (req, res) => {
//   try {
//     const msRoleMenu = await MsRoleMenu.findByPk(req.params.id);
//     if (!msRoleMenu) {
//       return resError(res, 404, "Master Role Menu tidak ditemukan.");
//     }
//     await msRoleMenu.destroy();
//     return resSukses(res, 200, "Berhasil menghapus Master Role Menu.");
//   } catch (error) {
//     return resError(res, 500, "Gagal menghapus Master Role Menu.");
//   }
// };
