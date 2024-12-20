const { MsRole } = require("../models");
var { resSukses, resError } = require("../helpers/response");

exports.getAllMsRoles = async (req, res) => {
  try {
    const msRoles = await MsRole.findAll({
      where: { is_active: true },
    });
    return resSukses(
      res,
      200,
      "Berhasil mendapatkan semua Master Role.",
      msRoles
    );
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan semua Master Role.");
  }
};

exports.getMsRoleById = async (req, res) => {
  try {
    const msRole = await MsRole.findOne({
      where: { id: req.params.id, is_active: true },
    });
    if (!msRole) {
      return resError(res, 404, "Master Role tidak ditemukan.");
    }
    return resSukses(res, 200, "Berhasil mendapatkan Master Role.", msRole);
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan Master Role.");
  }
};

exports.createMsRole = async (req, res) => {
  try {
    const msRole = await MsRole.create(req.body, req.sequelizeOptions);
    return resSukses(res, 200, "Berhasil membuat Master Role baru.", msRole);
  } catch (error) {
    return resError(res, 500, "Gagal membuat Master Role baru.");
  }
};

exports.updateMsRole = async (req, res) => {
  try {
    const msRole = await MsRole.findOne({
      where: { id: req.params.id, is_active: true },
    });
    if (!msRole) {
      return resError(res, 404, "Master Role tidak ditemukan.");
    }
    await msRole.update(req.body, req.sequelizeOptions);
    return resSukses(res, 200, "Berhasil memperbarui Master Role.", msRole);
  } catch (error) {
    return resError(res, 500, "Gagal memperbarui Master Role.");
  }
};

exports.deleteMsRole = async (req, res) => {
  try {
    const msRole = await MsRole.findOne({
      where: { id: req.params.id, is_active: true },
    });
    if (!msRole) {
      return resError(res, 404, "Master Role tidak ditemukan.");
    }
    await msRole.update({ is_active: false });
    return resSukses(res, 200, "Berhasil menghapus Master Role.");
  } catch (error) {
    return resError(res, 500, "Gagal menghapus Master Role.");
  }
};
