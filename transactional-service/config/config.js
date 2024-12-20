require("dotenv").config(); // this is important!

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_DATABASE,
    dialect: "postgres",
    timezone: "+07:00", //for writing to database
    dialectOptions: {
      // useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  // test: {
  //   username: "root",
  //   password: null,
  //   database: "database_test",
  //   host: "127.0.0.1",
  //   dialect: "postgres",
  // },
  // production: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_DATABASE,
  //   host: process.env.DB_DATABASE,
  //   dialect: "postgres",
  //   timezone: "+07:00", //for writing to database
  //   dialectOptions: {
  //     // useUTC: false, //for reading from database
  //     dateStrings: true,
  //     typeCast: true,
  //   },
  //   pool: {
  //     max: 100,
  //     min: 0,
  //     acquire: 60000,
  //     idle: 10000,
  //   },
  // },
};
