"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reservation", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      room_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      harga: {
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
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },
      updatedBy: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reservation");
  },
};
