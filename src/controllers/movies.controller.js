const { Op } = require('express');
const { Movie } = require('../models/Movie');
const { CharacterMovie } = require('../models/CharacterMovie');
const { Genre } = require('../models/Genre');
const { Character } = require('../models/Character');

const getMovies = async (req, res) => {
  try {
    const title = req.query.title || null;
    const order = req.query.order || null;
    const genre = req.query.genre || null;
    let result = null;
    if (genre !== null) {      
      result = await Movie.findAll({
        order: [["id", order || "ASC"]],
        include: {
          model: Genre,
          where: { name: genre },
          through: {
            attributes: [],
          },
        },
      });
    }
    if (title !== null) {
      result = await Movie.findAll({
        where: {
          title: title,
        },
        order: [["id", order || "ASC"]],
        include: {
          model: Genre,
          through: {
            attributes: [],
          },
        },
      });
    }
    if (title == null && genre == null) {
      result = await Movie.findAll({
        order: [["id", order || "ASC"]],
        include: {
          model: Genre,
          through: {
            attributes: [],
          },
        },
      });
    }
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }
    await res.json(result);
  } catch (error) {
    console.log(error);
  }
};
const editMovie = async (req,res) =>{
  try {
    const title = (req.query.title || null);
    const {image, releasedate, rate} = req.body;
    let result = null;
    if(title !== null){
      result = await Movie.update({
        title,
        image,
        releasedate,
        rate
      },{
        where: { title }
      })
    }
    if(result.rowCount === 0){
      return res.status(404).json({
        message: "Movie not found"
      })
    }
    await res.json(result);
  } catch (error) {
    console.log(error)
  }
};
const createMovie = async (req,res) => {
  try {
    const {title, image, rate, releasedate, character} = req.body;
    const newMovie = await Movie.create({
      image,
      title,
      rate,
      releasedate
    })
    if(newMovie.rowCount !== 0){
      let result = null;
      const name = character;
      if(name !== null){
        result = await Character.findOne({
          where: {name},
        });
      }
      if (result !== null) {
        console.log("result:" + result.id);
        console.log("newMovie:" + newMovie.id);
        const characterId = parseInt(result.id);
        const movieId = parseInt(newMovie.id);
        try {
          CharacterMovie.create({
            characterId,
            movieId,
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
    await res.json(newMovie);    
  } catch (error) {
    console.log(error);
  }
};
const deleteMovie = async (req,res)=>{
  try {
    let result = null;
    const title = (req.query.title || null);
    if(title !== null){
      result = await Movie.destroy({
        where: { title },
      })
    }
    res.json(result);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getMovies,
  editMovie,
  deleteMovie,
  createMovie,
};