"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "MsGroupMenus",
      [
        {
          id: "246090da-d320-407d-b3b2-a582f0183bee",
          service_id: "4a36c2a3-1dc0-49b9-a3a5-1de5f9d758e0",
          name: "Service Manager",
          note: "Keterangan group menu Master",
          createdAt: "2024-08-22T03:05:12.439Z",
          updatedAt: "2024-08-22T03:05:12.439Z",
          is_show: false,
        },
        {
          id: "dc748705-1485-4f0e-810b-441a16b9d555",
          service_id: "8e416062-7664-481e-8858-3242107c288f",
          name: "Master",
          note: "Keterangan group menu Master",
          createdAt: "2024-08-22T03:05:12.439Z",
          updatedAt: "2024-08-22T03:05:12.439Z",
          is_show: true,
        },
        {
          id: "3b2d91af-e322-4f2c-8a2e-6cff6464aa7e",
          service_id: "41c0ce99-bd52-4668-9881-0e293844f79a",
          name: "Storage Service",
          note: "Keterangan group menu Master",
          createdAt: "2024-08-22T03:05:12.855Z",
          updatedAt: "2024-08-22T03:05:12.855Z",
          is_show: false,
        },
        {
          id: "81aa4c01-70b1-43a0-a620-52f63a0c4190",
          service_id: "da2f6c45-9960-49fd-b977-61b9f7f572cb",
          name: "Log",
          note: "Keterangan group menu log",
          createdAt: "2024-08-22T03:05:14.354Z",
          updatedAt: "2024-08-22T03:05:14.354Z",
          is_show: true,
        },
        {
          id: "ce46b076-595e-4294-bf38-25e905db2e71",
          service_id: "fc5f34cb-29ec-4517-81a4-e70919736ac3",
          name: "Event",
          note: "Keterangan group menu Event",
          createdAt: "2024-08-22T03:05:14.354Z",
          updatedAt: "2024-08-22T03:05:14.354Z",
          is_show: true,
        },
      ],

      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("MsGroupMenus", null, {});
  },
};
