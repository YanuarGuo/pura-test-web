const { MsGroupMenu } = require("../models");
var { resSukses, resError } = require("../helpers/response");
const { where } = require("sequelize");

exports.getAllMsGroupMenus = async (req, res) => {
  try {
    const msGroupMenus = await MsGroupMenu.findAll({
      where: {
        is_show: true,
      },
    });
    return resSukses(
      res,
      200,
      "Berhasil mendapatkan semua Master Group Menu.",
      msGroupMenus
    );
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan semua Master Group Menu.");
  }
};

exports.getMsGroupMenuById = async (req, res) => {
  try {
    const msGroupMenu = await MsGroupMenu.findByPk(req.params.id, {
      where: {
        is_show: true,
      },
    });
    if (!msGroupMenu) {
      return resError(res, 404, "Master Group Menu tidak ditemukan.");
    }
    return resSukses(
      res,
      200,
      "Berhasil mendapatkan Master Group Menu.",
      msGroupMenu
    );
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan Master Group Menu.");
  }
};

exports.createMsGroupMenu = async (req, res) => {
  try {
    const msGroupMenu = await MsGroupMenu.create(req.body);
    return resSukses(
      res,
      201,
      "Berhasil membuat Master Group Menu baru.",
      msGroupMenu
    );
  } catch (error) {
    return resError(res, 500, "Gagal membuat Master Group Menu baru.");
  }
};

exports.updateMsGroupMenu = async (req, res) => {
  try {
    const msGroupMenu = await MsGroupMenu.findByPk(req.params.id);
    if (!msGroupMenu) {
      return resError(res, 404, "Master Group Menu tidak ditemukan.");
    }
    await msGroupMenu.update(req.body);
    return resSukses(
      res,
      200,
      "Berhasil memperbarui Master Group Menu.",
      msGroupMenu
    );
  } catch (error) {
    return resError(res, 500, "Gagal memperbarui Master Group Menu.");
  }
};

exports.deleteMsGroupMenu = async (req, res) => {
  try {
    const msGroupMenu = await MsGroupMenu.findByPk(req.params.id);
    if (!msGroupMenu) {
      return resError(res, 404, "Master Group Menu tidak ditemukan.");
    }
    await msGroupMenu.destroy();
    return resSukses(res, 200, "Berhasil menghapus Master Group Menu.");
  } catch (error) {
    return resError(res, 500, "Gagal menghapus Master Group Menu.");
  }
};
