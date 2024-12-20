"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserAccesses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "UserProfiles",
          },
          key: "id",
        },
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "MsRoles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      menu_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "MsMenus", // Nama model tabel yang dirujuk
          key: "id", // Kolom yang menjadi primary key di tabel yang dirujuk
        },
      },
      is_create: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_read_all: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_update: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_delete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserAccesses");
  },
};
