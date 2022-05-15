const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
const { Movie } = require("./Movie");

const Character = sequelize.define(
  "characters",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.FLOAT,
    },
    history: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = { Character };
