"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MsMenus", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      group_menu_id: {
        allowNull: false,
        references: {
          model: {
            tableName: "MsGroupMenus",
          },
          key: "id",
        },
        type: Sequelize.UUID,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      icon_local: {
        type: Sequelize.STRING,
      },
      icon_url: {
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.TEXT,
      },
      service_path_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      is_show: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MsMenus");
  },
};
