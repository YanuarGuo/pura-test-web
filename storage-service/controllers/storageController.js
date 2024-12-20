const { Storage, Sequelize } = require("../models");
const fs = require("fs");
const path = require("path");
var { resSukses, resError } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const parentDir = "files";

const uploadFiles = async (req, res) => {
  try {
    // Validasi request
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

      // Membuat nama file acak
      const fileName = uuid + path.extname(file.originalname);

      // Simpan informasi file ke dalam database
      const storage = await Storage.create({
        id: uuid,
        name: fileName,
        source: source,
        folder: folder,
        filename: fileName,
        size: size,
        ext: path.extname(file.originalname).substring(1), // Menghapus titik dari ekstensi file
      });

      if (storage) {
        const filePath = path.join(__dirname, "..", parentDir, source, folder);
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }
        fs.writeFile(`${filePath}/${fileName}`, file.buffer, (err) => {
          // if (err) {
          //   console.error(err);
          // }
        });
        // Tambahkan data file ke dalam array
        fileData.push(storage);
      }
    }
    // Response dengan data file yang telah diunggah
    return resSukses(res, 200, "File berhasil disimpan", fileData);
  } catch (error) {
    return resError(res, 500, `Gagal Mengupload File : ${error}`);
  }
};

// sample akses
// {{BASE_URL}}/files/public/public/filename.png (tanpa header)
// {{BASE_URL}}/storages/file/public/public/filename.png (dengan header)
// {{BASE_URL}}/storages/file/primarykey (dengan header)
const downloadFile = async (req, res) => {
  try {
    const { source, folder, filename, id } = req.params;

    // Cari file berdasarkan source, folder, dan filename di database
    let result;
    if (id) {
      result = await Storage.findByPk(id);
    } else {
      result = await Storage.findOne({
        where: { source: source, folder: folder, filename: filename },
      });
    }

    // Jika file tidak ditemukan, kirim respon 404
    if (!result) {
      return resError(res, 404, "File tidak ditemukan");
    }

    // Jika file ditemukan, kirimkan file ke klien
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

    // Cari file berdasarkan source, folder, dan filename di database
    let result;
    if (id) {
      result = await Storage.findByPk(id);
    } else {
      result = await Storage.findOne({
        where: { source: source, folder: folder, filename: filename },
      });
    }

    // Jika file tidak ditemukan, kirim respon 404
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

    // Buat klausa WHERE berdasarkan parameter filter yang ada
    if (source) whereClause.source = source;
    if (folder) whereClause.folder = folder;
    if (filename) {
      whereClause.filename = {
        [Sequelize.Op.iLike]: `%${filename}%`, // Gunakan Op.iLike untuk pencarian case-insensitive
      };
    }

    const files = await Storage.findAll({
      where: whereClause, // Tambahkan klausa WHERE ke query
    });
    return resSukses(res, 200, "Files berhasil ditemukan", files);
  } catch (error) {
    return resError(res, 500, `Gagal mendapatkan file: ${error}`);
  }
};

const deleteFile = async (req, res) => {
  const { id } = req.params;
  try {
    // Cari file berdasarkan ID
    const file = await Storage.findByPk(id);
    if (!file) {
      return resError(res, 404, "File tidak ditemukan");
    }

    // Hapus file dari sistem file
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

    // Hapus file dari database
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
