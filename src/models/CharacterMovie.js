const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
const { Movie } = require("./Movie");
const { Character } = require("./Character");

const CharacterMovie = sequelize.define(
  "character_movies",
  {
    characterId: {
      type: DataTypes.INTEGER,
      references: {
        model: Character,
        key: "id",
      },
    },
    movieId: {
      type: DataTypes.INTEGER,
      references: {
        model: Movie,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

Character.belongsToMany(Movie, { through: CharacterMovie });
Movie.belongsToMany(Character, { through: CharacterMovie });

module.exports = { CharacterMovie };
