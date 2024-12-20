const jwt = require("jsonwebtoken");
var { resError, codeError } = require("../helpers/response");

exports.setSequelizeUser = async (req, res, next) => {
  try {
    const decodedJwt = jwt.decode(req.headers["authorization"]);
    if (decodedJwt?.userId) {
      req.sequelizeOptions = {
        userId: `${decodedJwt.userProfile?.firstName} ${decodedJwt.userProfile?.lastName}`,
      };
    } else {
      req.sequelizeOptions = {};
    }
    next();
  } catch (error) {
    return resError(res, 500, `Gagal memverifikasi token.`);
  }
};
