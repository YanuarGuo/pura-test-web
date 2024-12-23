"use strict";
const { Model } = require("sequelize");
const moment = require("moment-timezone");

module.exports = (sequelize, DataTypes) => {
  class UserAccess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserAccess.belongsTo(models.MsMenu, {
        foreignKey: "menu_id",
        as: "menu",
      });
      UserAccess.belongsTo(models.UserProfile, {
        foreignKey: "user_id",
      });
    }
  }
  UserAccess.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Gunakan UUIDV4 untuk menghasilkan UUID secara otomatis
      },
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      menu_id: {
        allowNull: false,
        type: DataTypes.UUID,
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
      createdBy: {
        type: DataTypes.STRING,
      },
      updatedBy: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "UserAccess",
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

  // Format the date and time fields using moment-timezone before returning the data
  UserAccess.prototype.toJSON = function () {
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

  return UserAccess;
};
