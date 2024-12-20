"use strict";
const { Model } = require("sequelize");
const moment = require("moment-timezone");

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service.hasMany(models.ServicePath, {
        foreignKey: "service_id",
      });
    }
  }
  Service.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apikey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      host: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      port: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_suspend: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      is_maintenance: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      maintenance_message: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "services",
    }
  );

  // Format the date and time fields using moment-timezone before returning the data
  Service.prototype.toJSON = function () {
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

  return Service;
};
