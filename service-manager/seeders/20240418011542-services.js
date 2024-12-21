"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("services", [
      {
        id: "4a36c2a3-1dc0-49b9-a3a5-1de5f9d758e0",
        name: "Service Manager",
        host: "http://service-manager-peminjaman-ruang",
        port: null,
        apikey: "apikey1", // tambahkan apikey di sini
        is_maintenance: false,
        is_suspend: false,
        maintenance_message: "Service Manager is Under Maintenance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "5ae5e6e1-12cc-4ad1-8f80-8f2742cef3f5",
        name: "Auth Service",
        host: "http://auth-service-peminjaman-ruang",
        port: null,
        apikey: "apikey2", // tambahkan apikey di sini
        is_maintenance: false,
        is_suspend: false,
        maintenance_message: "Auth Service is Under Maintenance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "8e416062-7664-481e-8858-3242107c288f",
        name: "Master Service",
        host: "http://master-service-peminjaman-ruang",
        port: null,
        apikey: "apikey3", // tambahkan apikey di sini
        is_maintenance: false,
        is_suspend: false,
        maintenance_message: "Master Service is Under Maintenance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "da2f6c45-9960-49fd-b977-61b9f7f572cb",
        name: "Log Service",
        host: "http://log-service-peminjaman-ruang",
        port: null,
        apikey: "apikey4", // tambahkan apikey di sini
        is_maintenance: false,
        is_suspend: false,
        maintenance_message: "COA Service is Under Maintenance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "fc5f34cb-29ec-4517-81a4-e70919736ac3",
        name: "Transactional Service",
        host: "http://transactional-service-peminjaman-ruang",
        port: null,
        apikey: "apikey5", // tambahkan apikey di sini
        is_maintenance: false,
        is_suspend: false,
        maintenance_message: "Transactional Service is Under Maintenance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("services", null, {});
  },
};
