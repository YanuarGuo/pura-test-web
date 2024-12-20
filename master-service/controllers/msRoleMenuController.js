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

exports.upsertMsRoleMenu = async (req, res) => {
  try {
    const data = req.body;

    let msRoleMenu;

    req.sequelizeOptions.conflictFields = ["role_id", "menu_id"];

    if (Array.isArray(data)) {
      const temp = data.map(async (d) => {
        const cek = await MsRoleMenu.findOne({
          where: { role_id: d.role_id, menu_id: d.menu_id },
        });

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
      const cek = await MsRoleMenu.findOne({
        where: { role_id: data.role_id, menu_id: data.menu_id },
      });

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
