const { Op } = require('sequelize');
const { Character } = require('../models/Character');
const { CharacterMovie } = require('../models/CharacterMovie');
const { Movie } = require('../models/Movie');


const getCharacters = async (req,res) =>{
try {

  const name = (req.query.name || null);
  const age = (req.query.age || 0);
  let title = null;
 
  let result;
  if (name !== null || age !== 0) {
    result = await Character.findAll({
      where: {
        [Op.or]: [{ name }, { age }],
      },
      include: {
        model: Movie,
        through: {
          attributes: [],
        },
      },
    });   
    await res.json(result);
  } else {
    result = await Character.findAll({
      include: {
        model: Movie,
        through: {
          attributes: [],
        },
      },
    });
    await res.json(result);
  }
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "Character not found",
    });
  }
} catch (error) {
  console.log(error);
}
};
const createCharacter = async (req,res) => {
  const { image, name, age, weight,history, title} = req.body;
  try {
    const newCharacter = await Character.create({
      image,
      name,
      age,
      weight,
      history
    })
    if(newCharacter.rowCount !== 0){
      let result = null;
      if (title !== null) {
        result = await Movie.findOne({
          where: {title}
        })
      }     
      if (result.rowCount !== 0) {
        const characterId = parseInt(newCharacter.id);
        const movieId = parseInt(result.id);
        try {
          await CharacterMovie.create({
            characterId,
            movieId,
          });          
        } catch (error) {
          console.log(error);
        }
      }
    };
    await res.json(newCharacter)
  } catch (error) {
    console.log(error)
  }
};
const deleteCharacter = async (req,res) => {
  try {
    const name = (req.query.name || null);
    let result = null;
    if(name !== null){
      result = await Character.destroy({
        where: {
          name
        },
      });
    }
    if(result.rowCount === 0){
      return res.status(404).json({
        message: "Character not found"
      });
    }
    res.sendStatus(204);
  } catch (error) {
   console.log(error) 
  }
};
const editCharacter = async (req,res) => {
  try {
    const name = (req.query.name || null);
    const { image, age, weight, history} = req.body;
    let result = null;
    if(name !== null){
      result = await Character.update(
        {
          image,
          name,
          age,
          weight,
          history,
        },
        {
          where: {
            name,
          },
        }
      );
    }
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Character not found",
      });
    }
    res.sendStatus(204);
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getCharacters,
  createCharacter,
  deleteCharacter,
  editCharacter,
};