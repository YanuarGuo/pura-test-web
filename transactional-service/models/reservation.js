"use strict";
const { Model } = require("sequelize");
const moment = require("moment-timezone");

module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      Reservation.hasMany(models.ReservationDetail, {
        foreignKey: "reservation_id",
      });
    }
  }
  Reservation.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      room_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      createdBy: {
        type: DataTypes.STRING,
      },
      updatedBy: {
        type: DataTypes.STRING,
      },
      is_active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Reservation",
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

  Reservation.prototype.toJSON = function () {
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

  return Reservation;
};
