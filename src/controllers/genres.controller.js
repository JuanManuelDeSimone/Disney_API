const { Genre } = require('../models/Genre');

const getGenre = async (req,res)=>{
try {
  let result = null;
  const name = (req.query.name || null);
  if(name !== null){
    result = await Genre.findAll({
      where: {name}
    })
  }else{
    result = await Genre.findAll();
  }
  await res.json(result);
} catch (error) {
  console.log(error);
}
};
const createGenre = async (req,res) => {
  try {
    const {name, image} = req.body;
    const result = await Genre.create({
      name,
      image
    });    
    res.json(result);
  } catch (error) {
    console.log(error)
  }
};
const editGenre = async (req,res) => {
  try {
    const name = (req.query.name || null);
    const {image} = req.body;
    let result = null
    if(name !== null){
      const result = await Genre.update(
        {
          name,
          image,
        },
        {
          where: { name },
        }
      );
      if(result.rowCount === 0 ){
        return res.status(404).json({
          message: "Genre not found"
        })
      }
      await res.json(result);
    }
  } catch (error) {
    console.log(error)
  }
};
const deleteGenre = async (req,res) => {
  try {
    const name = (req.query.name || null);
    let result = null;
    if(name !== null){
      result = await Genre.destroy({
        where: {name}
      })
    }
    res.json(result);
  } catch (error) {
   console.log(error) 
  }
}


module.exports = {
  getGenre,
  createGenre,
  editGenre,
  deleteGenre,
};