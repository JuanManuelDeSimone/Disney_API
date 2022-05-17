const { Router } = require("express");
const router = Router();
const { getAllCharacters, createCharacter, deleteCharacter, editCharacter } = require("../controllers/characters.controller");

router.get("/api/all/characters", getAllCharacters);
router.post('/api/character', createCharacter);
router.delete('/api/character/:id', deleteCharacter);
router.put('/api/character/:id', editCharacter);

module.exports = router;