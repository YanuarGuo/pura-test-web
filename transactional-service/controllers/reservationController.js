const { Reservation } = require("../models");
var { resSukses, resError } = require("../helpers/response");

exports.getAllReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findAll();
    return resSukses(res, 200, "Berhasil mendapatkan semua Reservasi.", reservation);
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan semua Reservasi.");
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      where: { id: req.params.id, is_active: true },
    });
    if (!reservation) {
      return resError(res, 404, "Reservasi tidak ditemukan.");
    }
    return resSukses(res, 200, "Berhasil mendapatkan Reservasi.", reservation);
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan Reservasi.");
  }
};

exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body, req.sequelizeOptions);
    return resSukses(res, 200, "Berhasil membuat Reservasi baru.", reservation);
  } catch (error) {
    return resError(res, 500, "Gagal membuat Reservasi baru.");
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      where: { id: req.params.id, is_active: true },
    });
    if (!reservation) {
      return resError(res, 404, "Reservasi tidak ditemukan.");
    }
    await reservation.update(req.body, req.sequelizeOptions);
    return resSukses(res, 200, "Berhasil memperbarui Reservasi.", reservation);
  } catch (error) {
    return resError(res, 500, "Gagal memperbarui Reservasi.");
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      where: { id: req.params.id, is_active: true },
    });
    if (!reservation) {
      return resError(res, 404, "Reservasi tidak ditemukan.");
    }
    await reservation.update({ is_active: false });
    return resSukses(res, 200, "Berhasil menghapus Reservasi.");
  } catch (error) {
    return resError(res, 500, "Gagal menghapus Reservasi.");
  }
};
