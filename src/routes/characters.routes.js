const { Router } = require("express");
const router = Router();
const {
  getAllCharacters,
  createCharacter,
  deleteCharacter,
  editCharacter,
  getCharacterbyName
} = require("../controllers/characters.controller");

router.get("/api/characters", getAllCharacters);
router.get("/characters?name=:name", getCharacterbyName);
router.post('/api/character', createCharacter);
router.delete('/api/character/:id', deleteCharacter);
router.put('/api/character/:id', editCharacter);

module.exports = router;