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
      "Event",
      [
        {
          id: "6a6306c6-2f13-444f-8bd5-21ed349522b8",
          nama_event: "Lab Cub XII",
          tanggal_event: "2024-03-15",
          waktu_event: "07.00 - 21.00",
          kapasitas: "1000",
          compliment_chair: "20",
          deskripsi: "Lab Cup XII",
          url_lampiran: "url_lampiran",
          createdAt: "2024-08-22T03:05:11.884Z",
          updatedAt: "2024-08-22T03:05:11.884Z",
          createdBy: "Seeder",
          updatedBy: "Seeder",
          is_active: true,
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
    await queryInterface.bulkDelete("Event", null, {});
  },
};
