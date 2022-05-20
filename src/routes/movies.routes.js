const { Router } = require("express");
const { getMovies, editMovie, deleteMovie, createMovie } = require("../controllers/movies.controller");

const router = Router();

router.get('/api/movies', getMovies);
router.put('/api/movies', editMovie);
router.delete('/api/movies', deleteMovie);
router.post('/api/movies', createMovie);

module.exports = router;