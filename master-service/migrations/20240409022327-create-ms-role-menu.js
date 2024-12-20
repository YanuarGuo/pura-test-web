"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MsRoleMenus", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      role_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "MsRoles",
          },
          key: "id",
        },
      },
      menu_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "MsMenus",
          },
          key: "id",
        },
      },
      is_create: {
        type: Sequelize.BOOLEAN,
      },
      is_read: {
        type: Sequelize.BOOLEAN,
      },
      is_read_all: {
        type: Sequelize.BOOLEAN,
      },
      is_update: {
        type: Sequelize.BOOLEAN,
      },
      is_delete: {
        type: Sequelize.BOOLEAN,
      },
      is_approve: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("MsRoleMenus");
  },
};
