const codeError = `SVC-TS`;
const logger = require("./logger");

const resSukses = function (res, code, message, result = null) {
  logger.writeLog(res, code, message);
  return res.status(code).json({
    success: true,
    message: message,
    data: result,
  });
};

const resError = function (res, code, message) {
  if (code === 500) {
    logger.writeLogError(res, code, message);
  } else {
    logger.writeLog(res, code, message);
  }
  return res.status(code).json({
    success: false,
    message: `${message}`,
    service: `${codeError}`,
    data: null,
  });
};

const resGagal = function (
  res,
  code,
  message = "Maaf, Proses Gagal.",
  result = null
) {
  logger.writeLogError(res, code, message);
  return res.status(code).json({
    success: false,
    message: `${message}`,
    service: `${codeError}`,
    data: result,
  });
};

module.exports = {
  resSukses,
  resError,
  resGagal,
};
