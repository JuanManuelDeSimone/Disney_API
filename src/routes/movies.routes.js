const { Router } = require("express");
const { getMovies } = require("../controllers/movies.controller");

const router = Router();

router.get('/api/movies', getMovies);

module.exports = router;