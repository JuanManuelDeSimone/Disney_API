const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const Movie = sequelize.define(
  "movies",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    releasedate: {
      type: DataTypes.DATE,
    },
    rate: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Movie };
