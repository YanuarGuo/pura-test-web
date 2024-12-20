const { Storage, Sequelize } = require("../models");
const fs = require("fs");
const path = require("path");
var { resSukses, resError } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const parentDir = "files";

const uploadFiles = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return resError(res, 400, "Tidak ada file yang di upload");
    }

    const files = req.files;
    const folder = req.body.folder || "public";
    const source = req.body.source || "public";
    const fileData = [];

    for (const file of files) {
      const { originalname, mimetype, size } = file;
      const uuid = uuidv4();

      const fileName = uuid + path.extname(file.originalname);
      const storage = await Storage.create({
        id: uuid,
        name: fileName,
        source: source,
        folder: folder,
        filename: fileName,
        size: size,
        ext: path.extname(file.originalname).substring(1), 
      });

      if (storage) {
        const filePath = path.join(__dirname, "..", parentDir, source, folder);
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }
        fs.writeFile(`${filePath}/${fileName}`, file.buffer, (err) => {
        });
        fileData.push(storage);
      }
    }
    return resSukses(res, 200, "File berhasil disimpan", fileData);
  } catch (error) {
    return resError(res, 500, `Gagal Mengupload File : ${error}`);
  }
};

const downloadFile = async (req, res) => {
  try {
    const { source, folder, filename, id } = req.params;

    let result;
    if (id) {
      result = await Storage.findByPk(id);
    } else {
      result = await Storage.findOne({
        where: { source: source, folder: folder, filename: filename },
      });
    }

    if (!result) {
      return resError(res, 404, "File tidak ditemukan");
    }

    const filePath = path.join(
      __dirname,
      "..",
      parentDir,
      result.source,
      result.folder,
      result.filename
    );
    res.download(filePath, result.filename);
  } catch (error) {
    return resError(res, 500, "Gagal download file");
  }
};

const infoFile = async (req, res) => {
  try {
    const { source, folder, filename, id } = req.params;

    let result;
    if (id) {
      result = await Storage.findByPk(id);
    } else {
      result = await Storage.findOne({
        where: { source: source, folder: folder, filename: filename },
      });
    }

    if (!result) {
      return resError(res, 404, "File tidak ditemukan");
    }

    return resSukses(res, 200, "File berhasil ditemukan", result);
  } catch (error) {
    return resError(res, 500, "Gagal download file");
  }
};

const getAllFiles = async (req, res) => {
  try {
    const { source, folder, filename } = req.query;
    let whereClause = {};

    if (source) whereClause.source = source;
    if (folder) whereClause.folder = folder;
    if (filename) {
      whereClause.filename = {
        [Sequelize.Op.iLike]: `%${filename}%`, 
      };
    }

    const files = await Storage.findAll({
      where: whereClause,
    });
    return resSukses(res, 200, "Files berhasil ditemukan", files);
  } catch (error) {
    return resError(res, 500, `Gagal mendapatkan file: ${error}`);
  }
};

const deleteFile = async (req, res) => {
  const { id } = req.params;
  try {
    const file = await Storage.findByPk(id);
    if (!file) {
      return resError(res, 404, "File tidak ditemukan");
    }

    const filePath = path.join(
      __dirname,
      "..",
      parentDir,
      file.source,
      file.folder,
      file.filename
    );
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await file.destroy();

    return resSukses(res, 200, "File berhasil dihapus");
  } catch (error) {
    return resError(res, 500, "Gagal menghapus file");
  }
};

module.exports = {
  uploadFiles,
  downloadFile,
  infoFile,
  getAllFiles,
  deleteFile,
};
