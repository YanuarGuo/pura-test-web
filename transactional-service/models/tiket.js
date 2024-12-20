"use strict";
const { Model } = require("sequelize");
const moment = require("moment-timezone");

module.exports = (sequelize, DataTypes) => {
  class Tiket extends Model {
    static associate(models) {
      Tiket.belongsTo(models.Event, {
        foreignKey: "event_id",
      });
      Tiket.hasMany(models.TiketDetail, {
        foreignKey: "tiket_id",
      });
    }
  }
  Tiket.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      event_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: "Event",
          },
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdBy: {
        type: DataTypes.STRING,
      },
      updatedBy: {
        type: DataTypes.STRING,
      },
      is_show: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Tiket",
      hooks: {
        beforeCreate: (instance, options) => {
          instance.createdBy = options.userId;
          instance.updatedBy = options.userId;
        },
        beforeUpdate: (instance, options) => {
          instance.updatedBy = options.userId;
        },
      },
    }
  );

  Tiket.prototype.toJSON = function () {
    const values = { ...this.get() };

    if (values.createdAt) {
      values.createdAt = moment(values.createdAt)
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss");
    }

    if (values.updatedAt) {
      values.updatedAt = moment(values.updatedAt)
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss");
    }

    return values;
  };

  return Tiket;
};
