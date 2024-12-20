const { Kategori } = require("../models");
var { resSukses, resError } = require("../helpers/response");

exports.getAllKategori = async (req, res) => {
  try {
    const kategori = await Kategori.findAll();

    if (kategori.length === 0)
      return resError(res, 404, "Tidak ada Kategori yang tersedia.");

    return resSukses(
      res,
      200,
      "Berhasil mendapatkan semua Kategori.",
      kategori
    );
  } catch (err) {
    return resError(res, 500, "Gagal mendapatkan semua Kategori.");
  }
};

exports.getKategoriById = async (req, res) => {
  try {
    const kategori = await Kategori.findOne({
      where: { id: req.params.id },
    });

    if (!kategori)
      return resError(
        res,
        404,
        `Kategori dengan Id: ${req.params.id} tidak ditemukan.`
      );

    return resSukses(
      res,
      200,
      `Berhasil mendapatkan Kategori dengan Id: ${req.params.id}`,
      kategori
    );
  } catch (err) {
    return resError(res, 500, "Gagal mendapatkan Kategori.");
  }
};

exports.createKategori = async (req, res) => {
  try {
    const kategori = await Kategori.create(req.body, req.sequelizeOptions);
    return resSukses(res, 200, "Berhasil membuat Kategori.", kategori);
  } catch (err) {
    return resError(res, 500, "Gagal membuat Kategori.");
  }
};

exports.updateKategori = async (req, res) => {
  try {
    const kategori = await Kategori.findOne({
      where: { id: req.params.id },
    });

    if (!kategori)
      return resError(
        res,
        404,
        `Kategori dengan Id: ${req.params.id} tidak ditemukan.`
      );

    await kategori.update(req.body, req.sequelizeOptions);
    return resSukses(res, 200, "Berhasil memperbarui Kategori.", kategori);
  } catch (err) {
    return resError(res, 500, "Gagal memperbarui Kategori.");
  }
};

exports.deleteKategori = async (req, res) => {
  try {
    const kategori = await Kategori.findOne({
      where: { id: req.params.id },
    });

    if (!kategori)
      return resError(
        res,
        404,
        `Kategori dengan Id: ${req.params.id} tidak ditemukan.`
      );

    await kategori.destroy();
    return resSukses(res, 200, "Berhasil menghapus Kategori.");
  } catch (err) {
    return resError(res, 500, "Gagal menghapus Kategori.");
  }
};
