"use strict";
const { Model } = require("sequelize");
const moment = require("moment-timezone");

module.exports = (sequelize, DataTypes) => {
  class MsRoleMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MsRoleMenu.belongsTo(models.MsRole, {
        foreignKey: "role_id",
        as: "role",
      });

      MsRoleMenu.belongsTo(models.MsMenu, {
        foreignKey: "menu_id",
        as: "menu",
      });
    }
  }
  MsRoleMenu.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Gunakan UUIDV4 untuk menghasilkan UUID secara otomatis
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          async isValidRoleId(value) {
            const role = await sequelize.models.MsRole.findByPk(value);
            if (!role) {
              throw new Error("Role Tidak Ditemukan");
            }
          },
        },
      },
      menu_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          async isValidMenuId(value) {
            const menu = await sequelize.models.MsMenu.findByPk(value);
            if (!menu) {
              throw new Error("Menu Tidak Ditemukan");
            }
          },
        },
      },
      is_create: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_read_all: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_update: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "MsRoleMenu",
      // hooks: {
      //   beforeCreate: (instance, options) => {
      //     instance.createdBy = options.userId;
      //     instance.updatedBy = options.userId;
      //   },
      //   beforeUpdate: (instance, options) => {
      //     instance.updatedBy = options.userId;
      //   },
      // },
    }
  );
  return MsRoleMenu;
};
