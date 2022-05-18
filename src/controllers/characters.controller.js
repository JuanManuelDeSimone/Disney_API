const { Op } = require('sequelize');
const { Character } = require('../models/Character');

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
  const { image, name, age, weight,history} = req.body;
  try {
    const newCharacter = await Character.create({
      image,
      name,
      age,
      weight,
      history
    })
    res.json(newCharacter)
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