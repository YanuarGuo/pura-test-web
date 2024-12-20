require("dotenv").config(); // this is important!

const axios = require("axios");
var { resError, codeError } = require("../helpers/response");

/**
 * Middleware untuk memeriksa token dari user apakah login atau tidak
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.checkTokenUser = async function (req, res, next) {
  try {
    req.url = req.url.replace("/api", "");
    let longPath = req.url;

    // Jika path bukan register dan login,
    // Lakukan pengecekan header
    if (
      longPath != "/auth/register" &&
      longPath != "/auth/login" &&
      longPath != "/auth/forgot-password" &&
      longPath != "/auth/reset-password" &&
      longPath != "/auth/refresh"
    ) {
      let token = req.headers["authorization"];

      if (token.includes("Bearer ")) {
        token = token.split(" ")[1];
      }

      const response = await axios.post(
        `${process.env.HOST_AUTH}/auth/verify`,
        {
          token: token,
        }
      );

      if (!response.data.success) {
        return resError(res, 403, `${response.data.message}`);
      }
    }
    next(); // Lanjutkan ke middleware atau route berikutnya
  } catch (error) {
    return resError(res, 500, `Gagal memverifikasi token.`);
  }
};
