const { Reservations } = require("../models");
var { resSukses, resError } = require("../helpers/response");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const db = require("../models/index");
const { Op } = require("sequelize");

exports.getAllReservation = async (req, res) => {
  try {
    const reservation = await Reservations.findAll();
    return resSukses(
      res,
      200,
      "Berhasil mendapatkan semua Reservasi.",
      reservation
    );
  } catch (error) {
    console.log(error);
    return resError(res, 500, "Gagal mendapatkan semua Reservasi.");
  }
};

exports.getAllReservationJWT = async (req, res) => {
  try {
    let token = req.headers["authorization"];
    if (token.includes("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.decode(token);
    const userId = decoded.userId;

    console.log(userId);

    const reservation = await Reservations.findAll({
      where: { user_id: userId },
    });
    return resSukses(
      res,
      200,
      "Berhasil mendapatkan semua Reservasi.",
      reservation
    );
  } catch (error) {
    console.log(error);
    return resError(res, 500, "Gagal mendapatkan semua Reservasi.");
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservations.findOne({
      where: { id: req.params.id, is_active: true },
    });
    if (!reservation) {
      return resError(res, 404, "Reservasi tidak ditemukan.");
    }
    return resSukses(res, 200, "Berhasil mendapatkan Reservasi.", reservation);
  } catch (error) {
    console.log(error);
    return resError(res, 500, "Gagal mendapatkan Reservasi.");
  }
};

exports.createReservation = async (req, res) => {
  try {
    let token = req.headers["authorization"];
    if (token.includes("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.decode(token);
    const userId = decoded.userId;

    const { start_time, end_time, room_id } = req.body;
    if (!start_time || !end_time || !room_id) {
      return resError(
        res,
        400,
        "Start time, end time, dan room_id wajib diisi."
      );
    }

    const existingReservations = await Reservations.findAll({
      where: {
        room_id: room_id,
        status: "approved",
        [Op.or]: [
          {
            start_time: { [Op.between]: [start_time, end_time] },
          },
          {
            end_time: { [Op.between]: [start_time, end_time] },
          },
          {
            [Op.and]: [
              { start_time: { [Op.lte]: start_time } },
              { end_time: { [Op.gte]: end_time } },
            ],
          },
        ],
      },
    });

    if (existingReservations.length > 0) {
      return resError(res, 400, "Ruangan sudah dipesan pada waktu tersebut.");
    }

    req.body.user_id = userId;

    const reservation = await Reservations.create(
      req.body,
      req.sequelizeOptions
    );

    return resSukses(res, 200, "Berhasil membuat Reservasi baru.", reservation);
  } catch (error) {
    console.log(error);
    return resError(res, 500, "Gagal membuat Reservasi baru.");
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const { reservation_id } = req.params;
    const { start_time, end_time, room_id, purpose } = req.body;

    if (!reservation_id) {
      return resError(res, 400, "Reservation ID tidak ada.");
    }

    const reservation = await Reservations.findOne({
      where: { id: reservation_id },
    });

    if (!reservation) {
      return resError(res, 404, "Reservasi tidak ditemukan.");
    }

    if (reservation.status !== "pending") {
      return resError(
        res,
        403,
        "Hanya reservasi dengan status 'pending' yang dapat diperbarui."
      );
    }

    if (start_time || end_time || room_id) {
      const existingReservations = await Reservations.findAll({
        where: {
          room_id: room_id || reservation.room_id,
          status: "approved",
          id: { [Op.ne]: reservation_id },
          [Op.or]: [
            {
              start_time: {
                [Op.between]: [
                  start_time || reservation.start_time,
                  end_time || reservation.end_time,
                ],
              },
            },
            {
              end_time: {
                [Op.between]: [
                  start_time || reservation.start_time,
                  end_time || reservation.end_time,
                ],
              },
            },
            {
              [Op.and]: [
                {
                  start_time: {
                    [Op.lte]: start_time || reservation.start_time,
                  },
                },
                { end_time: { [Op.gte]: end_time || reservation.end_time } },
              ],
            },
          ],
        },
      });

      if (existingReservations.length > 0) {
        return resError(res, 400, "Ruangan sudah dipesan pada waktu tersebut");
      }
    }

    reservation.start_time = start_time || reservation.start_time;
    reservation.end_time = end_time || reservation.end_time;
    reservation.room_id = room_id || reservation.room_id;
    reservation.purpose = purpose || reservation.purpose;

    await reservation.save();

    return resSukses(res, 200, "Berhasil memperbarui Reservasi", reservation);
  } catch (error) {
    console.error(error);
    return resError(res, 500, "Gagal memperbarui Reservasi");
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservations.findOne({
      where: { id: req.params.id, is_active: true },
    });
    if (!reservation) {
      return resError(res, 404, "Reservasi tidak ditemukan.");
    }
    await reservation.update({ is_active: false });
    return resSukses(res, 200, "Berhasil menghapus Reservasi.");
  } catch (error) {
    console.log(error);
    return resError(res, 500, "Gagal menghapus Reservasi.");
  }
};

exports.adminValidation = async (req, res) => {
  try {
    const { status, reservation_id } = req.body;

    if (!reservation_id) {
      return resError(res, 400, "Reservation ID wajib disertakan.");
    }

    if (!["approved", "rejected"].includes(status)) {
      return resError(
        res,
        400,
        "Status harus berupa 'approved' atau 'rejected'."
      );
    }

    const reservation = await Reservations.findOne({
      where: { id: reservation_id },
    });

    if (!reservation) {
      return resError(res, 404, "Reservasi tidak ditemukan.");
    }

    if (reservation.status !== "pending") {
      return resError(
        res,
        403,
        "Hanya reservasi dengan status 'pending' yang dapat divalidasi."
      );
    }

    reservation.status = status;
    await reservation.save();

    return resSukses(
      res,
      200,
      `Reservasi berhasil diubah menjadi '${status}'.`,
      reservation
    );
  } catch (error) {
    console.error(error);
    return resError(res, 500, "Gagal memvalidasi reservasi.");
  }
};
