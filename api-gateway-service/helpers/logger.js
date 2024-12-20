const axios = require("axios");
const jwt = require("jsonwebtoken");

const getUserDetails = (req) => {
  const user = jwt.decode(req.headers["authorization"]);
  if (user) {
    return {
      user_id: user.userId,
      username: `${user.userProfile.firstName} ${user.userProfile.lastName}`,
    };
  }
  return { user_id: null, username: null };
};

const log = async (res, type, code, message) => {
  const req = res.req;
  const ipaddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const { user_id, username } = getUserDetails(req);

  const data = {
    type,
    ipaddr,
    method: req.method,
    url: req.originalUrl,
    user_id,
    username,
    message: `${code} ${type === "LOG" ? "TRUE" : "FALSE"} - ${message}`,
  };

  try {
    const response = await axios.post(
      "http://log-service-peminjaman-ruang/logs",
      data
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

exports.writeLog = (res, code, message) => log(res, "LOG", code, message);
exports.writeLogError = (res, code, message) => log(res, "ERR", code, message);
exports.writeLogWarning = (res, code, message) =>
  log(res, "WARN", code, message);
exports.writeLogDebug = (res, code, message) =>
  log(res, "DEBUG", code, message);
