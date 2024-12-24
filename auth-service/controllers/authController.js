const { User } = require("../models");
const hrp = require("../helpers/response");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
var jwt = require("jsonwebtoken");
const axios = require("axios");
const db = require("../models/index");

require("dotenv").config();

// Access token and refresh token expiration time
const accessTokenExpiration = "1d"; // 1 days
const refreshTokenExpiration = "1d"; // 1 days

// Helper function to generate access token
function generateAccessToken(user) {
  return jwt.sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: accessTokenExpiration,
    }
  );
}

// Helper function to generate refresh token
function generateRefreshToken(user) {
  return jwt.sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: refreshTokenExpiration,
    }
  );
}

exports.register = async function (req, res, next) {
  try {
    // Get user input
    const { username, password, email } = req.body;

    // Validate user input
    if (!(username && password && email)) {
      return hrp.resGagal(res, 400, "Semua Inputan Harus Diisi.");
    }

    const authResult = await User.findOne({
      where: {
        username: username,
      },
      attributes: { exclude: ["password"] },
    });

    if (authResult) {
      return hrp.resGagal(res, 404, "Maaf username sudah terdaftar.");
    }

    //Create Auth
    const auth = await User.create({
      id: uuidv4(),
      username: username,
      email: email,
      password: await bcrypt.hash(password, 10),
    });

    if (auth) {
      auth.set({ password: null });
      return hrp.resSukses(res, 201, "Berhasil membuat akun", auth);
    } else {
      return hrp.resGagal(res, 500, "Maaf, Gagal mendaftarkan akun.");
    }
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return hrp.resGagal(res, 500, err.errors[0].message);
    }

    return hrp.resGagal(
      res,
      500,
      "Maaf, Terjadi Kesalahan. Silahkan ulangi lagi."
    );
  }
};

exports.logout = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];

    var userId;
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err) {
        return hrp.resGagal(res, 500, "Invalid token " + err);
      }
      userId = decode.userId;
    });

    const user = await User.findOne({
      where: { id: userId, suspend: false },
    });

    if (!user) {
      return hrp.resGagal(res, 404, "Maaf, Pengguna tidak ditemukan");
    }

    if (user) {
      user.set({ token: null, refreshToken: null });

      // Check if refresh token is valid
      jwt.verify(
        user.refreshToken,
        process.env.JWT_SECRET_KEY,
        (err, decoded) => {
          if (err) {
            user.set({ refreshToken: generateRefreshToken(user) });
          }
        }
      );
      await user.save();

      return hrp.resSukses(res, 200, "Logout Sukses");
    }
  } catch (err) {
    return hrp.resGagal(
      res,
      500,
      "Maaf, Terjadi Kesalahan. Silahkan ulangi lagi."
    );
  }
};

exports.login = async function (req, res, next) {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      return hrp.resGagal(res, 400, "Semua Inputan Harus Diisi.");
    }

    // Validate if user exist in our database
    const user = await User.findOne({
      where: { username: username, suspend: false },
    });

    if (!user) {
      return hrp.resGagal(res, 404, "Akun tidak ditemukan");
    }

    if (user.resetKey) {
      return hrp.resGagal(res, 403, "Akun dalam pengajuan reset password");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create access token and refresh token
      const accessToken = generateAccessToken(user);

      user.set({ token: accessToken });
      user.set({ lastLogin: new Date() });

      // Check if refresh token is valid
      jwt.verify(
        user.refreshToken,
        process.env.JWT_SECRET_KEY,
        (err, decoded) => {
          if (err) {
            user.set({ refreshToken: generateRefreshToken(user) });
          }
        }
      );
      await user.save();

      var resultData = {
        id: user.id,
        token: user.token,
        refreshToken: user.refreshToken,
      };

      return hrp.resSukses(res, 200, "Login Sukses", resultData);
    }

    return hrp.resGagal(res, 404, "Akun tidak ditemukan");
  } catch (err) {
    return hrp.resGagal(
      res,
      500,
      "Maaf, Terjadi Kesalahan. Silahkan ulangi lagi."
    );
  }
};

exports.refresh = async function (req, res, next) {
  try {
    const { refreshToken } = req.body;

    var userId;

    // Check if refresh token is valid
    jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return hrp.resGagal(res, 400, "Gagal verifikasi");
      }
      userId = decoded.userId;
    });

    if (!userId) {
      return hrp.resGagal(res, 403, "User tidak ditemukan");
    }

    // Find user by user ID in decoded token
    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return hrp.resGagal(res, 403, "User tidak ditemukan");
    }

    // Generate new access token
    const accessToken = generateAccessToken(user);
    const refreshedToken = generateRefreshToken(user);

    // Send new access token in response
    if (user) {
      user.set({ token: accessToken });
      user.set({ refreshToken: refreshedToken });
      await user.save();

      return hrp.resSukses(res, 200, "Berhasil generate token", {
        token: accessToken,
        refreshToken: refreshedToken,
      });
    }
    return hrp.resGagal(res, 500, "Gagal Generate");
  } catch (err) {
    return hrp.resGagal(
      res,
      500,
      "Maaf, Terjadi Kesalahan. Silahkan ulangi lagi."
    );
  }
};

exports.verifyToken = async function (req, res, next) {
  try {
    const { token } = req.body;
    var userId;
    var userTokenVersion;

    // Check if refresh token is valid
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      // if (err) {
      //   return hrp.resGagal(res, 400, "Gagal Verifikasi");
      // }
      userId = decoded?.userId;
      userTokenVersion = decoded?.tokenVersion;
    });

    if (!userId) {
      return hrp.resGagal(res, 403, "User tidak ditemukan");
    }

    // Find user by user ID in decoded token
    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return hrp.resGagal(res, 403, "User tidak ditemukan");
    }

    if (user.tokenVersion !== userTokenVersion) {
      return hrp.resGagal(
        res,
        500,
        "Maaf, Terjadi Kesalahan. Silahkan ulangi lagi."
      );
    }

    // Send new access token in response
    if (user) {
      return hrp.resSukses(res, 200, "Berhasil verifikasi token", userId);
    }
  } catch (err) {
    return hrp.resGagal(
      res,
      500,
      "Maaf, Terjadi Kesalahan. Silahkan ulangi lagi."
    );
  }
};

exports.forgotPassword = async function (req, res, next) {
  try {
    const { email } = req.body;

    // Find user by user ID in decoded token
    const user = await User.findOne({
      where: { email: email, suspend: false },
    });

    if (!user) {
      return hrp.resGagal(res, 403, "User tidak ditemukan");
    }

    if (user.resetKey) {
      return hrp.resGagal(res, 403, "Sudah melakukan pengajuan reset password");
    }

    // Generate new reset key
    // const resetKey = crypto.randomBytes(20).toString("hex");
    const resetKey = generateAccessToken(user);

    // Add reset key to selected user
    if (user) {
      user.set({ resetKey: resetKey });
      const emailData = {
        emailTo: user.email,
        subject: "Reset Password",
        body: `<p>Silahkan klik link berikut untuk melakukan reset password</p>
              <a href= "${process.env.HOST_FRONTEND}/reset-password?key=${resetKey}">klik disini</a>`,
      };
      const email = await axios({
        method: "POST",
        url: process.env.HOST_EMAIL + "/email/sent",
        data: emailData,
      });

      await user.save();
      return hrp.resSukses(res, 200, "Silakan Cek Email Anda", {
        result: email.data,
      });
    }

    return hrp.resGagal(res, 500, "Gagal Generate");
  } catch (err) {
    console.log(err);
    return hrp.resGagal(
      res,
      500,
      "Maaf, Terjadi Kesalahan. Silahkan ulangi lagi.",
      err.message
    );
  }
};

exports.resetPassword = async function (req, res, next) {
  try {
    const { key, new_password } = req.body;

    var userId;

    jwt.verify(key, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return hrp.resGagal(res, 400, "Gagal verifikasi");
      }
      userId = decoded.userId;
    });

    // Find user by user ID and reset key in request
    const user = await User.findOne({
      where: { id: userId, resetKey: key, suspend: false },
    });

    if (!user) {
      return hrp.resGagal(res, 403, "User tidak ditemukan");
    }

    // Clear reset key and reset password to '1sampai8'
    if (user) {
      user.set({
        resetKey: null,
        password: await bcrypt.hash(new_password, 10),
        tokenVersion: user.tokenVersion + 1,
      });
      await user.save();

      return hrp.resSukses(res, 200, "Berhasil reset password", null);
    }

    return hrp.resGagal(res, 500, "Gagal Reset Password");
  } catch (err) {
    return hrp.resGagal(
      res,
      500,
      "Maaf, Terjadi Kesalahan. Silahkan ulangi lagi."
    );
  }
};

exports.updateUser = async function (req, res, next) {
  try {
    let token = req.headers["authorization"];
    if (token.includes("Bearer ")) {
      token = token.split(" ")[1];
    }

    var userId;
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err) {
        return hrp.resGagal(res, 500, "Invalid token " + err);
      }
      userId = decode.userId;
    });

    const user = await User.findOne({
      where: { id: userId, suspend: false },
    });

    if (!user) {
      return hrp.resGagal(res, 404, "Maaf, Pengguna tidak ditemukan");
    }

    const { username, email, password } = req.body;

    const setData = {};
    let logoutMessage = "";

    if (username) setData.username = username;

    if (email) {
      if (!email.endsWith(`@gmail.com`))
        return hrp.resGagal(res, 403, "Email tidak valid");
      setData.email = email;
    }

    if (password) {
      if (!(await bcrypt.compare(password, user.password))) {
        setData.password = await bcrypt.hash(password, 10);
        setData.tokenVersion = user.tokenVersion + 1;
        logoutMessage = ", silahkan masuk ulang!";
      }
    }

    user.set(setData);
    await user.save();

    return hrp.resSukses(res, 200, `Akun berhasil diperbarui${logoutMessage}`);
  } catch (err) {
    console.log(err);
    return hrp.resGagal(
      res,
      500,
      "Maaf, Terjadi Kesalahan. Silahkan ulangi lagi."
    );
  }
};

exports.getUserAuthData = async (req, res) => {
  try {
    const { ids } = req.query;
    const whereCondition = {};

    if (ids) {
      const userIds = ids.split(",");
      whereCondition.id = { [db.Sequelize.Op.in]: userIds };
    }

    const users = await User.findAll({
      where: whereCondition,
      attributes: ["id", "username", "email"],
    });

    return hrp.resSukses(res, 200, "Berhasil reset password", users);
  } catch (error) {
    console.log(error);
    return hrp.resGagal(res, 500, "Gagal mendapatkan semua Users.");
  }
};
