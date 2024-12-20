"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "UserProfiles",
      [
        {
          id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434",
          firstName: "Administrator",
          lastName: "Sistem",
          address: "Salatiga",
          phoneNumber: "08123456789",
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: "Seeder",
          updatedBy: "Seeder",
          is_active: true,
        },
      ],

      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserProfiles", null, {});
  },
};
