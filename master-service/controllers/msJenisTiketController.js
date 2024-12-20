const { MsJenisTiket } = require("../models");
var { resSukses, resError } = require("../helpers/response");

exports.getAllMsJenisTikets = async (req, res) => {
  try {
    const msJenisTikets = await MsJenisTiket.findAll();
    return resSukses(
      res,
      200,
      "Berhasil mendapatkan semua Master Jenis Tiket.",
      msJenisTikets
    );
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan semua Master Jenis Tiket.");
  }
};

exports.getMsJenisTiketById = async (req, res) => {
  try {
    const msJenisTiket = await MsJenisTiket.findOne({
      where: { id: req.params.id, is_active: true },
    });
    if (!msJenisTiket) {
      return resError(res, 404, "Master Jenis Tiket tidak ditemukan.");
    }
    return resSukses(
      res,
      200,
      "Berhasil mendapatkan Master Jenis Tiket.",
      msJenisTiket
    );
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan Master Jenis Tiket.");
  }
};

exports.createMsJenisTiket = async (req, res) => {
  try {
    const msJenisTiket = await MsJenisTiket.create(
      req.body,
      req.sequelizeOptions
    );
    return resSukses(
      res,
      200,
      "Berhasil membuat Master Jenis Tiket baru.",
      msJenisTiket
    );
  } catch (error) {
    return resError(res, 500, "Gagal membuat Master Jenis Tiket baru.");
  }
};

exports.updateMsJenisTiket = async (req, res) => {
  try {
    const msJenisTiket = await MsJenisTiket.findOne({
      where: { id: req.params.id, is_active: true },
    });
    if (!msJenisTiket) {
      return resError(res, 404, "Master Jenis Tiket tidak ditemukan.");
    }
    await msJenisTiket.update(req.body, req.sequelizeOptions);
    return resSukses(
      res,
      200,
      "Berhasil memperbarui Master Jenis Tiket.",
      msJenisTiket
    );
  } catch (error) {
    return resError(res, 500, "Gagal memperbarui Master Jenis Tiket.");
  }
};

exports.deleteMsJenisTiket = async (req, res) => {
  try {
    const msJenisTiket = await MsJenisTiket.findOne({
      where: { id: req.params.id, is_active: true },
    });
    if (!msJenisTiket) {
      return resError(res, 404, "Master Jenis Tiket tidak ditemukan.");
    }
    await msJenisTiket.update({ is_active: false });
    return resSukses(res, 200, "Berhasil menghapus Master Jenis Tiket.");
  } catch (error) {
    return resError(res, 500, "Gagal menghapus Master Jenis Tiket.");
  }
};
