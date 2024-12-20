const { MsMenu, MsGroupMenu } = require("../models");
var { resSukses, resError } = require("../helpers/response");

exports.getAllMsMenus = async (req, res) => {
  try {
    const msMenus = await MsMenu.findAll({
      where: {
        is_show: true,
        ["$group_menu.is_show$"]: true,
      },
      include: [{ model: MsGroupMenu, as: "group_menu" }],
    });
    return resSukses(
      res,
      200,
      "Berhasil mendapatkan semua Master Menu.",
      msMenus
    );
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan semua Master Menu.");
  }
};

exports.getMsMenuById = async (req, res) => {
  try {
    const msMenu = await MsMenu.findByPk(req.params.id, {
      where: {
        is_show: true,
        ["$group_menu.is_show$"]: true,
      },
      include: [{ model: MsGroupMenu, as: "group_menu" }],
    });
    if (!msMenu) {
      return resError(res, 404, "Master Menu tidak ditemukan.");
    }
    return resSukses(res, 200, "Berhasil mendapatkan Master Menu.", msMenu);
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan Master Menu.");
  }
};

exports.createMsMenu = async (req, res) => {
  try {
    const msMenu = await MsMenu.create(req.body);
    return resSukses(res, 201, "Berhasil membuat Master Menu baru.", msMenu);
  } catch (error) {
    return resError(
      res,
      500,
      error.errors
        ? error.errors.map((e) => e.message)
        : `Gagal membuat Master Menu baru.`
    );
  }
};

exports.updateMsMenu = async (req, res) => {
  try {
    const msMenu = await MsMenu.findByPk(req.params.id);
    if (!msMenu) {
      return resError(res, 404, "Master Menu tidak ditemukan.");
    }
    await msMenu.update(req.body);
    return resSukses(res, 200, "Berhasil memperbarui Master Menu.", msMenu);
  } catch (error) {
    return resError(
      res,
      500,
      error.errors
        ? error.errors.map((e) => e.message)
        : `Gagal memperbarui Master Menu.`
    );
  }
};

exports.deleteMsMenu = async (req, res) => {
  try {
    const msMenu = await MsMenu.findByPk(req.params.id);
    if (!msMenu) {
      return resError(res, 404, "Master Menu tidak ditemukan.");
    }
    await msMenu.destroy();
    return resSukses(res, 200, "Berhasil menghapus Master Menu.");
  } catch (error) {
    return resError(res, 500, "Gagal menghapus Master Menu.");
  }
};
