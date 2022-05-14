const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
const { Expense } = require("./Expense");

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
      type: DataType.STRING,
    },
    movie_id: {
      type: DataType.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

Character.hasMany(Movie, {
  foreignKey: "movie_id",
  sourceKey: "id",
  onDelete: "CASCADE",
});
Movie.hasMany(Character, {
  foreignKey: "character_id",
  sourceKey: "id",
  onDelete: "CASCADE",
});

module.exports = { Character };
