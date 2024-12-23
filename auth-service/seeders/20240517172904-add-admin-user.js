"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
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
      "Users",
      [
        {
          id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434",
          username: "admin",
          role: "admin",
          email: "admin@example.com",
          password: await bcrypt.hash("1sampai8", 10),
          token: null,
          refreshToken: null,
          lastLogin: null,
          suspend: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          resetKey: null,
        },
        {
          id: "e5b0678b-8725-4184-b304-eeb1e414e7c7",
          username: "user",
          role: "user",
          email: "user@example.com",
          password: await bcrypt.hash("1sampai8", 10),
          token: null,
          refreshToken: null,
          lastLogin: null,
          suspend: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          resetKey: null,
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
    return queryInterface.bulkDelete(
      "Users",
      { id: "c0db4c0a-4a42-4413-b2e5-68d9a7272434" },
      {}
    );
  },
};
