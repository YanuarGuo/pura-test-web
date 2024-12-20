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
      "Tiket",
      [
        {
          id: "e6491de3-b40a-4d62-afd4-e28109cd3348",
          event_id: "6a6306c6-2f13-444f-8bd5-21ed349522b8",
          createdAt: "2024-08-22T03:05:11.884Z",
          updatedAt: "2024-08-22T03:05:11.884Z",
          createdBy: "Seeder",
          updatedBy: "Seeder",
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
    await queryInterface.bulkDelete("Tiket", null, {});
  },
};
