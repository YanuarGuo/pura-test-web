"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ReservationDetails", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      reservation_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Reservation",
          },
          key: "id",
        },
      },
      kategori_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      harga: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      jumlah_kursi: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ReservationDetails");
  },
};
