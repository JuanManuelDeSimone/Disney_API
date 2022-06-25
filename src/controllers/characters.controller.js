const { Op } = require('sequelize');
const { Character } = require('../models/Character');
const { CharacterMovie } = require('../models/CharacterMovie');
const { Movie } = require('../models/Movie');
const { Genre } = require('../models/Genre');

const getCharacters = async (req,res) =>{
try {

  const name = (req.query.name || null);
  const age = (req.query.age || 0);
  const title = (req.query.title || null);
 
  let result;
  if (name !== null || age !== 0) {
    console.log("entro 1")
    result = await Character.findAll({
      where: {
        [Op.or]: [{ name }, { age }],
      },
      include: {
        model: Movie,
        through: {
          attributes: [],
        },
        include:{
          model: Genre,
          through:{
            attributes: [],
          }
        }
      },
    });   
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Character not found",
      });
    }    
    await res.json(result);
  } else {
    console.log("entro 2");    
    result = await Character.findAll({
      include: {
        model: Movie,
        through: {
          attributes: [],
        },
        include: {
          model: Genre,
          through: {
            attributes: [],
          },
        },
      },
    });
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Character not found",
      });
    }     
    await res.json(result);
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
      if (result !== null) {
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
    if (newCharacter.rowCount === 0) {
      return res.status(404).json({
        message: "Character not created",
      });
    }        
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