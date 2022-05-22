const { Router } = require("express");
const router = Router();
const {
  createCharacter,
  deleteCharacter,
  editCharacter,
  getCharacters,
} = require("../controllers/characters.controller");

router.get('/api/characters', getCharacters);
router.post('/api/character', createCharacter);
router.delete('/api/character/:id', deleteCharacter);
router.put('/api/character/:id', editCharacter);

module.exports = router;