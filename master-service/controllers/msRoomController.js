const { MsRooms } = require("../models");
var { resSukses, resError } = require("../helpers/response");

exports.getAllRooms = async (req, res) => {
  try {
    const msRooms = await MsRooms.findAll();
    return resSukses(res, 200, "Berhasil mendapatkan semua Ruang.", msRooms);
  } catch (error) {
    console.log(error);
    return resError(res, 500, "Gagal mendapatkan semua Ruang.");
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const msRooms = await MsRooms.findOne({
      where: { id: req.params.id, is_maintenance: false },
    });
    if (!msRooms) {
      return resError(res, 404, "Ruang tidak ditemukan.");
    }
    return resSukses(res, 200, "Berhasil mendapatkan Ruang.", msRooms);
  } catch (error) {
    console.log(error);
    return resError(res, 500, "Gagal mendapatkan Ruang.");
  }
};

exports.createRoom = async (req, res) => {
  try {
    const msRooms = await MsRooms.create(req.body, req.sequelizeOptions);
    return resSukses(res, 200, "Berhasil membuat Ruang baru.", msRooms);
  } catch (error) {
    console.log(error);
    return resError(res, 500, "Gagal membuat Ruang baru.");
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const msRooms = await MsRooms.findOne({
      where: { id: req.params.id },
    });
    if (!msRooms) {
      return resError(res, 404, "Ruang tidak ditemukan.");
    }
    await msRooms.update(req.body, req.sequelizeOptions);
    return resSukses(res, 200, "Berhasil memperbarui Ruang.", msRooms);
  } catch (error) {
    console.log(error);
    return resError(res, 500, "Gagal memperbarui Ruang.");
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const msRooms = await MsRooms.findOne({
      where: { id: req.params.id },
    });
    if (!msRooms) {
      return resError(res, 404, "Ruang tidak ditemukan.");
    }
    await msRooms.update({ is_maintenance: false });
    return resSukses(res, 200, "Berhasil menghapus Ruang.");
  } catch (error) {
    console.log(error);
    return resError(res, 500, "Gagal menghapus Ruang.");
  }
};
