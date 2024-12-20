const codeError = `SVC-LOG`;

const resSukses = function (res, code, message, result = null) {
  return res.status(code).json({
    success: true,
    message: message,
    data: result,
  });
};
const resError = function (res, code, message) {
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
  message = `Maaf, Proses Gagal.`,
  result = null
) {
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
