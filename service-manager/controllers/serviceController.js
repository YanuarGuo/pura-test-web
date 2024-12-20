const { Service, ServicePath } = require("../models");

var { resSukses, resError } = require("../helpers/response");

exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    if (service) {
      return resSukses(res, 201, "Layanan berhasil dibuat", service);
    }
  } catch (error) {
    return resError(res, 500, "Gagal membuat layanan baru : " + error.message);
  }
};

exports.getAllServices = async (req, res) => {
  const serviceId = req.query.id;
  const searchName = req.query.name;
  const urlPath = req.query.path;
  var services;
  try {
    if (serviceId) {
      services = await Service.findByPk(serviceId, {
        include: [{ model: ServicePath }],
      });
    } else if (urlPath) {
      const servicePath = await ServicePath.findOne({
        where: { path_name: urlPath },
      });

      if (servicePath) {
        services = await Service.findOne({
          where: { id: servicePath.service_id },
          include: [{ model: ServicePath }],
        });
      }
    } else if (searchName) {
      services = await Service.findOne({
        where: { name: searchName },
        include: [{ model: ServicePath }],
      });
    } else {
      services = await Service.findAll({
        include: [{ model: ServicePath }],
      });
    }
    if (services) {
      return resSukses(res, 200, "Data layanan berhasil diambil", services);
    } else {
      return resError(res, 404, "Layanan tidak ditemukan!");
    }
  } catch (error) {
    return resError(
      res,
      500,
      "Gagal mengambil data layanan : " + error.message
    );
  }
};

exports.getServiceById = async (req, res) => {
  var serviceId = req.params.id;
  try {
    service = await Service.findByPk(serviceId, {
      include: [{ model: ServicePath }],
    });
    if (!service) {
      return resError(res, 404, "Layanan tidak ditemukan");
    }
    return resSukses(res, 200, "Data layanan berhasil diambil", service);
  } catch (error) {
    return resError(
      res,
      500,
      "Gagal mengambil data layanan : " + error.message
    );
  }
};

exports.updateService = async (req, res) => {
  const serviceId = req.params.id;
  const updatedData = req.body;
  try {
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return resError(res, 404, "Layanan tidak ditemukan");
    }
    const updatedService = await service.update(updatedData);
    return resSukses(
      res,
      200,
      "Data layanan berhasil diperbarui",
      updatedService
    );
  } catch (error) {
    return resError(res, 500, "Gagal mengubah data layanan : " + error.message);
  }
};

exports.deleteService = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return resError(res, 404, "Layanan tidak ditemukan");
    }
    deleted = await service.destroy();
    if (deleted) {
      return resSukses(res, 200, "Layanan berhasil dihapus", null);
    }
  } catch (error) {
    return resError(res, 500, "Gagal menghapus layanan : " + error.message);
  }
};
