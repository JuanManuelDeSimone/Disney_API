const { Router } = require("express");
const { registerUser } = require("../controllers/register.controller");

const router = Router();

router.post("/api/register", registerUser);

module.exports = router;
