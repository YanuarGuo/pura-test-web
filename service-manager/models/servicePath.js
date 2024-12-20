"use strict";
const { Model } = require("sequelize");
const moment = require("moment-timezone");

module.exports = (sequelize, DataTypes) => {
  class ServicePath extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ServicePath.belongsTo(models.Service, {
        foreignKey: "service_id",
        as: "service",
      });
    }
  }
  ServicePath.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      service_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      path_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_maintenance: {
        type: DataTypes.SMALLINT,
        defaultValue: 0, //0 normal, 1 maintenance
        allowNull: false,
      },
      is_suspend: {
        type: DataTypes.SMALLINT,
        defaultValue: 0, //0 normal, 1 suspend
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "service_paths",
    }
  );

  // Format the date and time fields using moment-timezone before returning the data
  ServicePath.prototype.toJSON = function () {
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

  return ServicePath;
};
