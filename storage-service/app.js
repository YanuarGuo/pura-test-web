var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Mengatur folder publik untuk menyajikan file-file gambar
app.use("/files", express.static(path.join(__dirname, "files")));

app.use("/", indexRouter);

module.exports = app;
