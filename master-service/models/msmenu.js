"use strict";
const { Model } = require("sequelize");
const moment = require("moment-timezone");

module.exports = (sequelize, DataTypes) => {
  class MsMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MsMenu.belongsTo(models.MsGroupMenu, {
        foreignKey: "group_menu_id",
        as: "group_menu",
      });
    }
  }
  MsMenu.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Gunakan UUIDV4 untuk menghasilkan UUID secara otomatis
      },
      group_menu_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          async isValidGroupMenuId(value) {
            const groupMenu = await sequelize.models.MsGroupMenu.findByPk(
              value
            );
            if (!groupMenu) {
              throw new Error("Group Menu Tidak Ditemukan");
            }
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icon_local: DataTypes.STRING,
      icon_url: DataTypes.STRING,
      note: DataTypes.TEXT,
      service_path_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      is_show: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "MsMenu",
    }
  );

  // Format the date and time fields using moment-timezone before returning the data
  MsMenu.prototype.toJSON = function () {
    const values = { ...this.get() };

    // Format the created_at field
    if (values.createdAt) {
      values.createdAt = moment(values.createdAt)
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss");
    }

    // Format the updated_at field
    if (values.updatedAt) {
      values.updatedAt = moment(values.updatedAt)
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss");
    }

    return values;
  };

  return MsMenu;
};
