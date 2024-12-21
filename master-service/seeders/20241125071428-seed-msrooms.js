"use strict";

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

    await queryInterface.bulkInsert("MsRooms", [
      {
        id: "c1b5bd9e-d56b-4f75-b934-87f17616cc09",
        room_name: "VIP1",
        location: "Lantai 1",
        capacity: 20,
        description: "Ruang VIP1",
        createdAt: "2024-08-22T03:05:11.884Z",
        updatedAt: "2024-08-22T03:05:11.884Z",
        createdBy: "Seeder",
        updatedBy: "Seeder",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
