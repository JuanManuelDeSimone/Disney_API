const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const Genre = sequelize.define(
  "genres",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = { Genre };
