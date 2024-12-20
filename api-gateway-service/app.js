var express = require("express");
var helmet = require("helmet");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { createProxyMiddleware } = require("http-proxy-middleware");

var { serviceProvider } = require("./controllers/gatewayController");

// Initialize middleware for gateway checker
var { checkGatewayKey } = require("./middleware/gatewayChecker");
var { checkTokenUser } = require("./middleware/userTokenChecker");
var { checkServiceAccess } = require("./middleware/serviceAccessChecker");

var app = express();
app.use(helmet());

// Mengaktifkan CORS dengan konfigurasi khusus
const corsOptions = {
  origin: "*", // Hanya izinkan akses dari domain ini
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization,Bearer,unixtime,gateway-key",
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 1000, // Range request per 1s
  max: 10, // Max 10 request per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/files",
  createProxyMiddleware({
    target: "http://storage-service-peminjaman-ruang",
    changeOrigin: true,
  })
);

//Lakukan pengecekan middleware
//Pemeriksaan Header untuk mengakses API Gateway
app.use(checkGatewayKey);

//Lakukan pengecekan middleware
//Pemeriksaan Validasi dan verifikasi token user
app.use(checkTokenUser);

//Lakukan pengecekan middleware
//Pemeriksaan service terdaftar / tidak, dan user punya akses / tidak
app.use(checkServiceAccess);

app.use("/", (req, res, next) => {
  try {
    //Load controller
    return serviceProvider(req, res);
  } catch (error) {
    message = "Error";
    data = typeof error.code !== "undefined" ? error.code : "Unknown";
    return res.status(500).json({
      success: false,
      messages: data,
      data: null,
    });
  }
});

module.exports = app;
