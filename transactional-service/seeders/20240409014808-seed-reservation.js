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
      "Reservation",
      [
        {
          id: "e6491de3-b40a-4d62-afd4-e28109cd3348",
          user_id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434",
          room_id: "c1b5bd9e-d56b-4f75-b934-87f17616cc09",
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
    await queryInterface.bulkDelete("Reservation", null, {});
  },
};
