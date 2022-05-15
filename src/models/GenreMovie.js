const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
const { Movie } = require("./Movie");
const { Genre } = require("./Genre");

const GenreMovie = sequelize.define(
  "genre_movies",
  {
    genreId: {
      type: DataTypes.INTEGER,
      references: {
        model: Genre,
        key: 'id'
      }
    },
    movieId: {
      type: DataTypes.INTEGER,
      references: {
        model: Movie,
        key: 'id'
      }
    },
  },
  {
    timestamps: true,
  }
);

Genre.belongsToMany(Movie, { through: GenreMovie });
Movie.belongsToMany(Genre, { through: GenreMovie });

module.exports = { GenreMovie };
