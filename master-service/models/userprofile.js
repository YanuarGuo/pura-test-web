"use strict";
const { Model } = require("sequelize");
const moment = require("moment-timezone");

module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Metode bantuan untuk mendefinisikan asosiasi.
     * Metode ini bukan bagian dari siklus hidup Sequelize.
     * File `models/index` akan memanggil metode ini secara otomatis.
     */
    static associate(models) {}
  }

  UserProfile.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: "UserProfiles",
    }
  );

  // Format bidang tanggal dan waktu menggunakan moment-timezone sebelum mengembalikan data
  UserProfile.prototype.toJSON = function () {
    const values = { ...this.get() };

    // Format bidang createdAt
    if (values.createdAt) {
      values.createdAt = moment(values.createdAt)
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss");
    }

    // Format bidang updatedAt
    if (values.updatedAt) {
      values.updatedAt = moment(values.updatedAt)
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss");
    }

    return values;
  };

  return UserProfile;
};
