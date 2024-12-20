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
      "MsRoles",
      [
        {
          id: "2d4970a9-7c30-428f-b339-eea6c34863a5",
          name: "Admin",
          note: "Keterangan role Admin",
          createdAt: "2024-08-22T03:05:11.884Z",
          updatedAt: "2024-08-22T03:05:11.884Z",
          createdBy: "Seeder",
          updatedBy: "Seeder",
          is_active: true,
        },
        {
          id: "52ff8737-0ae1-4951-b9e7-dd7ba78bc474",
          name: "User",
          note: "Keterangan role User",
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
    await queryInterface.bulkDelete("MsRoles", null, {});
  },
};
