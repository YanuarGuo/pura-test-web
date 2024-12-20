const { ServicePaths, Services } = require("../models");
var { resSukses, resError } = require("../helpers/response");

exports.getAllServicePaths = async (req, res) => {
  try {
    const appPaths = await ServicePaths.findAll({
      include: [{ model: Services, as: "service" }],
    });
    return resSukses(
      res,
      200,
      "Berhasil mendapatkan semua Service Path.",
      appPaths
    );
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan semua Service Path.");
  }
};

exports.getServicePathById = async (req, res) => {
  try {
    const appPath = await ServicePaths.findByPk(req.params.id, {
      include: [{ model: Services, as: "service" }],
    });
    if (!appPath) {
      return resError(res, 404, "Service Path tidak ditemukan.");
    }
    return resSukses(res, 200, "Berhasil mendapatkan Service Path.", appPath);
  } catch (error) {
    return resError(res, 500, "Gagal mendapatkan Service Path.");
  }
};

exports.createServicePath = async (req, res) => {
  try {
    const appPath = await ServicePaths.create(req.body);
    return resSukses(res, 201, "Berhasil membuat Service Path baru.", appPath);
  } catch (error) {
    return resError(
      res,
      500,
      error.errors
        ? error.errors.map((e) => e.message)
        : `Gagal membuat Service Path baru.`
    );
  }
};

exports.updateServicePath = async (req, res) => {
  try {
    const appPath = await ServicePaths.findByPk(req.params.id);
    if (!appPath) {
      return resError(res, 404, "Service Path tidak ditemukan.");
    }
    await appPath.update(req.body);
    return resSukses(res, 200, "Berhasil memperbarui Service Path.", appPath);
  } catch (error) {
    return resError(
      res,
      500,
      error.errors
        ? error.errors.map((e) => e.message)
        : `Gagal memperbarui Service Path.`
    );
  }
};

exports.deleteServicePath = async (req, res) => {
  try {
    const appPath = await ServicePaths.findByPk(req.params.id);
    if (!appPath) {
      return resError(res, 404, "Service Path tidak ditemukan.");
    }
    await appPath.destroy();
    return resSukses(res, 200, "Berhasil menghapus Service Path.");
  } catch (error) {
    return resError(res, 500, "Gagal menghapus Service Path.");
  }
};
