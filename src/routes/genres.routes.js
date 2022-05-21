const { Router } = require('express');
const {
  getGenre,
  createGenre,
  editGenre,
  deleteGenre,
} = require("../controllers/genres.controller");

const router = Router();

router.get('/api/genres', getGenre);
router.post("/api/genres", createGenre);
router.put("/api/genres", editGenre);
router.delete('/api/genres', deleteGenre);

module.exports = router;
