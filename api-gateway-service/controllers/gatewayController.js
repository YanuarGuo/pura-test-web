require("dotenv").config(); 

// const formidable = require("formidable");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const {
  createProxyMiddleware,
  fixRequestBody,
} = require("http-proxy-middleware");


/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.serviceProvider = async (req, res) => {
  let longPath = req.url;
  let endPoint = req.appURL + longPath;

  const escapedLongPath = longPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  setPreLog(req, longPath);

  return createProxyMiddleware({
    target: endPoint,
    changeOrigin: true,
    pathRewrite: {
      [`^${escapedLongPath}`]: "",
    },
    onProxyReq: (proxyReq, req) => {
      proxyReq.path = longPath;
      fixRequestBody(proxyReq, req);
    },
  })(req, res);
};

async function setPreLog(req, url) {
  const ipaddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const method = req.method;
  const user = jwt.decode(req.headers["authorization"]);

  let user_id, username;
  if (user) {
    user_id = user?.userId;
    username = `${user?.userProfile?.firstName} ${user?.userProfile?.lastName}`;
  }

  const data = {
    type: "LOG",
    ipaddr: ipaddr,
    method: method,
    url: url,
    user_id: user_id,
    username: username,
    message: `Request ke ${url}`,
  };

  try {
    const response = await axios({
      method: "POST",
      url: "http://log-service-peminjaman-ruang/logs",
      data: data,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
}