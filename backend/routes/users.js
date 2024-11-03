const express = require("express");
const { getProfil } = require("../controllers/users/user");

const router = express.Router();
router.get("/profile", getProfil);

module.exports = router;
