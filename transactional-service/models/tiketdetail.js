"use strict";
const { Model } = require("sequelize");
const moment = require("moment-timezone");

module.exports = (sequelize, DataTypes) => {
  class TiketDetail extends Model {
    static associate(models) {
      TiketDetail.belongsTo(models.Tiket, {
        foreignKey: "tiket_id",
      });
    }
  }
  TiketDetail.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      tiket_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: "Tiket",
          },
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      kategori_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      harga: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      jumlah_kursi: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "TiketDetail",
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

  TiketDetail.prototype.toJSON = function () {
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

  return TiketDetail;
};
