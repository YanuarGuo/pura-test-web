// models/storage.js

const { DataTypes } = require("sequelize");
const moment = require("moment-timezone");

module.exports = (sequelize) => {
  const Storage = sequelize.define(
    "Storage",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      // Service Sumber
      source: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      folder: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "public",
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ext: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
    {
      tableName: "Storages",
    }
  );

  // Format the date and time fields using moment-timezone before returning the data
  Storage.prototype.toJSON = function () {
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
  return Storage;
};
