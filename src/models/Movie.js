const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
const { Expense } = require("./Expense");

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
    date: {
      type: DataTypes.DATE,
    },
    rate: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

Category.hasMany(Expense, {
  foreignKey: "category_id",
  sourceKey: "id",
  onDelete: "CASCADE",
});
Expense.belongsTo(Category, { foreignKey: "category_id", targetKey: "id" });

module.exports = { Character };
