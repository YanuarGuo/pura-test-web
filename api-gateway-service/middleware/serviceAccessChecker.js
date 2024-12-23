require("dotenv").config(); // this is important!

const axios = require("axios");
const url = require("url");
var { resError, codeError } = require("../helpers/response");
const jwt = require("jsonwebtoken");
const { log } = require("console");

exports.checkServiceAccess = async function (req, res, next) {
  try {
    var endpoint = "";
    let longPath = req.url;

    // Parse the URL string
    const parsedUrl = url.parse(req.url, true);

    // Get the group from the path
    const destination_service = parsedUrl.pathname.split("/")[1];
    const splitUrl = parsedUrl.pathname.split("/");

    for (let i = 2; i < splitUrl.length; i++) {
      endpoint += splitUrl[i] + "/";
    }

    endpoint = endpoint.slice(0, -1); // Menghapus trailing slash terakhir

    //cari layanan berdasarkan destination_service pada database jika ketemu
    const app = await getAppService(res, destination_service);

    if (app.success === false) {
      return resError(res, 404, "Maaf, Service tidak terdaftar.");
    }

    let appURL = app.data.host;

    if (app.data.port) {
      appURL += ":" + app.data.port;
    }

    if (
      Object.keys(req.query).length >= 0 ||
      Object.keys(req.body).length > 0
    ) {
      const userAccess = await getUserAccess(
        req,
        res,
        app.data.ServicePaths,
        longPath
      );

      // if (userAccess.allowed === false) {
      //   return resError(res, 403, "Maaf, Anda tidak memiliki akses.");
      // }

      req.appURL = appURL;

      next(); // Lanjutkan ke middleware atau route berikutnya
    } else {
      return resError(res, 400, "Parameter Tidak Lengkap");
    }
  } catch (error) {
    return resError(res, 500, `Gagal mencari service`);
  }
};

/**
 * Mendapatkan servis berdasarkan endpoint
 *
 * @param {*} res
 * @param {*} path merupakan endpoint
 * @returns
 */
async function getAppService(res, path) {
  const url = `${process.env.HOST_SERVICE_MANAGER}/services`;

  try {
    const response = await axios.get(`${url}?path=${path}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
}

/**
 * Mendapatkan hak akses user terhadap path yang dituju
 * @param {*} req
 * @param {*} res
 * @param {*} appPaths di dapat dari return getAppService yang ada pada serviceProvider
 * @param {*} targetPath dari longPath yang ada pada serviceProvider
 * @returns
 */
async function getUserAccess(req, res, servicePaths, targetPath) {
  try {
    // 1. Dapatkan service_path id dari data servicePaths yang didapat dari getAppService dan cari path yang dituju
    const servicePathId = servicePaths.find(
      (obj) => obj.path_name === targetPath.match(/^\/([^/?]+)/)[1] // regex untuk extract path tanpa param & query
    )?.id;

    // 2. Cari menu terkait dari master/user-access, dimana menu_id memiliki service_path_id yang sama pada poin nomer 1
    let allowed = false;

    // Bypass get /user-access & /user-profiles/:id because it's a mandatory route
    const userProfileRegex = /^\/user-profiles\/.+/;

    if (
      targetPath != "/auth/register" &&
      targetPath != "/auth/login" &&
      targetPath != "/auth/forgot-password" &&
      targetPath != "/auth/reset-password" &&
      targetPath != "/auth/refresh" &&
      targetPath != "/user-access" &&
      targetPath != "/auth/user" &&
      !userProfileRegex.test(targetPath)
    ) {
      const filteredHeaders = { ...req.headers };

      // Remove headers that might cause issues
      delete filteredHeaders["host"];
      delete filteredHeaders["connection"];
      delete filteredHeaders["content-length"];
      delete filteredHeaders["content-encoding"];

      const response = await axios({
        method: "GET",
        url: `${process.env.HOST_MASTER}/user-access?service_path_id=${servicePathId}`,
        headers: filteredHeaders,
      });

      // 3. Cek akses user berdasarkan method, POST = is_create, PUT = is_update, DELETE = is_delete, GET = is_read / is_read_all
      const method = req.method.toLowerCase();

      // Bypass GET /user-access and /user-profile
      if (
        (method === "get" && targetPath === "/user-access") ||
        (method === "get" && userProfileRegex.test(targetPath))
      ) {
        allowed = true;
      } else if (response.data.data.length > 0) {
        const permission = response.data.data[0];
        switch (method) {
          case "get":
            allowed = permission.is_read || permission.is_read_all;
            break;
          case "post":
            allowed = permission.is_create;
            break;
          case "put":
            allowed = permission.is_update;
            break;
          case "delete":
            allowed = permission.is_delete;
            break;
        }

        if (allowed) {
          // 1. decode jwt
          let token = req.headers["authorization"];
          if (token.includes("Bearer ")) {
            token = token.split(" ")[1];
          }
          const data = jwt.decode(token);

          // 2. tambah data
          // nambah data user pg via ganti header authorization
          const userProfile = await getUserProfile(data.userId);
          console.log(userProfile.data);
          console.log(data);
          // nambah permission & combine jadi satu
          let newData = {
            userId: data.userId,
            userProfile: userProfile?.data,
            userPermission: {
              is_create: permission.is_create,
              is_read: permission.is_read,
              is_read_all: permission.is_read_all,
              is_update: permission.is_update,
              is_delete: permission.is_delete,
              is_validate: permission.role.is_validate,
              is_authorize: permission.role.is_authorize,
            },
          };

          // 3. encrypt jwt secret key 60s
          const newHeader = jwt.sign(newData, process.env.JWT_SECRET_KEY, {
            expiresIn: 60,
          });

          // 4. ganti header
          req.headers["authorization"] = newHeader;
        }
      }
    } else {
      allowed = true;
    }

    return {
      allowed: allowed,
    };
  } catch (error) {
    return {
      allowed: false,
    };
  }
}

/**
 * Mendapatkan profil dari user yang terautentikasi
 * @param {*} req
 * @param {*} res
 * @param {*} appPaths di dapat dari decode header Authorization
 * @returns
 */
async function getUserProfile(userId) {
  const url = `${process.env.HOST_MASTER}/user-profiles/${userId}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
}
