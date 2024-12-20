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
      "TiketDetail",
      [
        {
          id: "fb7e983c-1cc2-4f3e-a831-3ea70f31450c",
          tiket_id: "e6491de3-b40a-4d62-afd4-e28109cd3348",
          kategori_id: "78166a33-727f-40cd-af94-19828a86f720",
          harga: "150000",
          jumlah_kursi: "1",
          createdAt: "2024-08-22T03:05:11.884Z",
          updatedAt: "2024-08-22T03:05:11.884Z",
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
    await queryInterface.bulkDelete("TiketDetail", null, {});
  },
};
