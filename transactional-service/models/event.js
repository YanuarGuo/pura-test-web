"use strict";
const { Model } = require("sequelize");
const moment = require("moment-timezone");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.hasMany(models.Tiket, {
        foreignKey: "event_id",
      });
    }
  }
  Event.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nama_event: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tanggal_event: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      waktu_event: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kapasitas: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      compliment_chair: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deskripsi: DataTypes.TEXT,
      url_lampiran: DataTypes.STRING,
      createdBy: {
        type: DataTypes.STRING,
      },
      updatedBy: {
        type: DataTypes.STRING,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Event",
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

  Event.prototype.toJSON = function () {
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

  return Event;
};
