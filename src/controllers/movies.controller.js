const { Op } = require('express');
const { Movie } = require('../models/Movie');

const getMovies = async (req,res)=>{
  try {
    const title = (req.query.title || null);
    let result = null;
    if(title !== null){
      result = await Movie.findAll({
      where:{
        title
      }     
    })
      if (result.rowCount === 0) {
        return res.status(404).json({
          message: "Movie not found",
        });
      }     
    }else{
      result = await Movie.findAll();
    }
    await res.json(result);
  } catch (error) {
    console.log(error)
  }
};
const editMovie = async (req,res) =>{
  try {
    const title = (req.query.title || null);
    const {image, date, rate} = req.body;
    let result = null;
    if(title !== null){
      result = await Movie.update({
        title,
        image,
        date,
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
    const {title, image, rate, date} = req.body;
    const result = await Movie.create({
      image,
      title,
      rate,
      date
    })
    res.json(result);    
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