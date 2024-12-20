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

exports.upsertUserAccess = async (req, res) => {
  try {
    const data = req.body;

    let userAccess;

    req.sequelizeOptions.conflictFields = ["user_id", "menu_id"];

    if (Array.isArray(data)) {
      const temp = data.map(async (d) => {
        const cek = await UserAccess.findOne({
          where: { user_id: d.user_id, menu_id: d.menu_id },
        });

        if (cek) {
          d.updatedBy = req.sequelizeOptions.userId;
        } else {
          d.createdBy = req.sequelizeOptions.userId;
          d.updatedBy = req.sequelizeOptions.userId;
        }

        const [instance, created] = await UserAccess.upsert(
          d,
          req.sequelizeOptions
        );

        return instance;
      });

      userAccess = await Promise.all(temp);
    } else {
      const cek = await UserAccess.findOne({
        where: { user_id: data.user_id, menu_id: data.menu_id },
      });

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
