const { Router } = require('express');
const router = Router();

router.get("/", (req, res) => {
  res.json({ title: "Jurassic Park" });
});
router.get("/movies", (req, res) => {
  const data = {
    "title": "Volver al futuro",
    "Year": "1985"
  }
  res.json(data);
});
module.exports = router;