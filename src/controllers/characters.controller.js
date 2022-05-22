const { Op } = require('sequelize');
const { Character } = require('../models/Character');
const { CharacterMovie } = require('../models/CharacterMovie');
const { Movie } = require('../models/Movie');

const getCharacters = async (req,res) =>{
try {

  const name = (req.query.name || null);
  const age = (req.query.age || 0);
 
  let result;
  if (name !== null || age !== 0) {
    result = await Character.findAll({
      where: {
        [Op.or]: [{ name }, { age }],
      },
    });
  } else {
    result = await Character.findAll();
  }
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "Character not found",
    });
  }
  res.json(result);
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
        result = await Movie.findAll({
          where: {
            title,
          },
        });
        //console.log(result);         
      }     
      if (result.rowCount !== 0) {
        console.log('newCharacter:'+newCharacter.id);
        console.log('result:'+result[0].id);
        const characterId = parseInt(newCharacter.id);
        const movieId = parseInt(result[0].id);
        await CharacterMovie.create({
          characterId,
          movieId,
        });
      }
    };
    await res.json(newCharacter)
  } catch (error) {
    console.log(error)
  }
};
const deleteCharacter = async (req,res) => {
  try {
    const {id} = req.params;
    const result = await Character.destroy({
      where: {
        id
      }
    });
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
    const {id} = req.params;
    const { image, name, age, weight, history} = req.body;
    const result = await Character.update(
      {
        image,
        name,
        age,
        weight,
        history
      },
      {
        where: {
          id,
        },
      }
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Character not found",
      });
    }
    res.sendStatus(204);
    res.json(result);
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