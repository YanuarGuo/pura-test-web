"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Storages",
      [
        {
          id: "b9d3af8b-09e6-4b52-93d1-5b7be0f7c312", // id bisa diganti dengan UUID yang lain
          source: "qrcode", // service sumber/nama service
          folder: "public", // default public, atau bisa setting sendiri untuk nama folder
          filename: "file1", // filename tanpa extensi
          size: 300, // ukuran file dalam bytes
          ext: "jpg", // extensi dari file
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Storages", null, {});
  },
};
