require("dotenv").config(); // this is important!

var { resError, codeError } = require("../helpers/response");
const crypto = require("crypto");

/**
 * Sebuah fungsi middleware untuk memeriksa Header untuk mengakses Api Gateway
 *
 * @param {*} req - objek yang dikirim saat melakukan request
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.checkGatewayKey = function (req, res, next) {
  // Isi header yang akan dilakukan pemeriksaan
  let gateway_key = "";
  let unixtime = "";

  // Periksa apakah (req) memiliki `gateway-key` dan `unixtime`
  if (req.headers["gateway-key"] && req.headers["unixtime"]) {
    // Ambil header dan masukan kedalam variabel yang telah disediakan
    gateway_key = req.headers["gateway-key"];
    unixtime = req.headers["unixtime"];

    // Periksa apakah header `gateway-key` merupakan kunci produksi
    if (gateway_key != `${process.env.DEV_GATEWAY}`) {
      // Proses pengujian kecocokan gateway-key dan unixtime sesuai kebutuhan
      var resultServer = encryptHMAC(unixtime, process.env.API_GATEWAY);
      if (resultServer != gateway_key) {
        return resError(res, 400, `ApiKey Tidak Valid`);
      }
    }
    next();
  } else {
    return resError(res, 400, `Header Tidak Lengkap`);
  }
};

/**
 * Sebuah fungsi untuk melakukan enkripsi menggunakan sha256
 * @param {*} unixTime - waktu ketika melakukan request dalam format Unix timestamp
 * @param {*} apiKey - kunci (dev/prod) yang digunakan untuk melakukan enkripsi
 * @returns
 */
function encryptHMAC(unixTime, apiKey) {
  const currentDate = new Date().toISOString().substring(0, 10);
  const combinedString = apiKey + currentDate;

  const key = Buffer.from(combinedString); //Buat sebuah kunci dari komibinasi string
  const plain = Buffer.from(unixTime.toString()); //Konversi unixtime ke Buffer

  const hmacSha256 = crypto.createHmac("sha256", key); //Siapkan proses enkripsi sha256 menggunakan kunci yang telah dibuat
  hmacSha256.update(plain); //Lakukan enkripsi

  const cipher = hmacSha256.digest(); //Mendapatkan hasil enkripsi
  const cipherHexString = cipher.toString("hex"); //Konversikan hasil enkripsi menjadi hex

  return cipherHexString;
}
