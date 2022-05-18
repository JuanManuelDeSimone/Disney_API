const { Op } = require('express');
const { Movie } = require('../models/Movie');

const getMovies = async (req,res)=>{
  try {
    const name = (req.query.name || null);
    let result = null;
    if(name !== null){
    const result = await Movie.findAll({
      where:{
        title
      }     
    })
      if (result.rowCount === 0) {
        return res.status(404).json({
          message: "Movie not found",
        });
      }     
    }

  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getMovies
}