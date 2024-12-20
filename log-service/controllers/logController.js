require("dotenv").config();
var { resSukses, resError } = require("../helpers/response");
const fs = require("fs");
const path = require("path");

const F_DEBUG = process.env.APP_LOGGER_FILE_DEBUG;
const F_LOG = process.env.APP_LOGGER_FILE_LOG;
const F_WARN = process.env.APP_LOGGER_FILE_WARNING;
const F_ERR = process.env.APP_LOGGER_FILE_ERROR;

exports.getAllLogs = async (req, res) => {
  let logs;
  try {
    const { type, date } = req.query;
    if (!type || !date) {
      return resError(res, 400, "Parameter tidak sesuai");
    }
    logs = await new Promise((resolve, reject) => {
      const filename = `../.logs/${type.toLowerCase()}-${date}.logs`;
      const filepath = path.resolve(__dirname, filename);

      fs.readFile(filepath, "utf8", (err, data) => {
        if (err) {
          return reject(err);
        }
        // di bentuk ke array
        const lines = data.split("\n").map((line) => line.trim());
        resolve(lines);
        // resolve(data); // tanpa di bentuk ke array
      });
    });

    return resSukses(res, 200, "Berhasil mendapatkan semua Log.", logs);
  } catch (error) {
    console.error(error);

    if (error.code === "ENOENT") {
      return resError(res, 404, "Log tidak ditemukan", logs);
    }

    return resError(res, 500, "Gagal mendapatkan semua Log.");
  }
};

exports.createLog = async (req, res) => {
  try {
    let file;

    // build message
    const { type, ipaddr, user_id, username, method, url, message } = req.body;
    const date = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const currentDate = getCurrentDate();
    let logStr = `${date} | [${ipaddr}] - [${user_id} ~ ${username}] | ${method.toUpperCase()} | ${url} | ${message}`;

    file = `${F_LOG}-${currentDate}.logs`;

    if (type.toUpperCase() == "DEBUG") {
      file = `${F_DEBUG}-${currentDate}.logs`;
      console.debug(logStr);
    } else if (type.toUpperCase() == "LOG") {
      file = `${F_LOG}-${currentDate}.logs`;
      console.log(logStr);
    } else if (type.toUpperCase() == "WARN") {
      file = `${F_WARN}-${currentDate}.logs`;
      console.warn(logStr);
    } else if (type.toUpperCase() == "ERR") {
      file = `${F_ERR}-${currentDate}.logs`;
      console.error(logStr);
    }

    const log = `${logStr}\n`;

    // build file
    try {
      fs.appendFileSync(file, log, "utf8");
    } catch {
      console.error(`[ERROR] failed to append log to ${file}`);
      try {
        console.debug(`[DEBUG] creating empty log file to ${file}`);
        fs.writeFileSync(file, "", "utf8");
        try {
          fs.appendFileSync(file, log, "utf8");
        } catch {
          console.error(
            `[ERROR] failed to write log to ${file} after creation. exiting...`
          );
        }
      } catch {
        console.error(`[ERROR] failed to log file create ${file}`);
        try {
          if (fs.existsSync(".logs")) {
            console.debug(
              `[DEBUG] .logs directory detected. retrying to create log file to ${file}`
            );
            fs.writeFileSync(file, "", "utf8");
            console.debug(`[DEBUG] trying to append to ${file}`);
            fs.appendFileSync(file, log, "utf8");
          } else {
            console.debug(`[DEBUG] creating log folder`);
            fs.mkdirSync(".logs");
            console.debug(`[DEBUG] retrying to create log file to ${file}`);
            fs.writeFileSync(file, "", "utf8");
            console.debug(`[DEBUG] trying to append to ${file}`);
            fs.appendFileSync(file, log, "utf8");
          }
        } catch {
          console.error(
            `[ERROR] failed to write log to ${file} after creation. FILE WRITING PERMISSION ERROR`
          );
        }
      }
    }

    return resSukses(res, 200, "Berhasil membuat Log.", { log: logStr });
  } catch (error) {
    console.error(error);
    return resError(res, 500, "Gagal membuat Log.");
  }
};

function getCurrentDate() {
  const options = {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const now = new Date();

  const formatter = new Intl.DateTimeFormat("id-ID", options);
  const formattedParts = formatter.formatToParts(now);

  const parts = {};
  for (const { type, value } of formattedParts) {
    parts[type] = value;
  }

  const year = parts.year;
  const month = parts.month;
  const day = parts.day;

  return `${year}${month}${day}`;
}
