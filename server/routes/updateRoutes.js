const express = require("express");
const router = express.Router();

const updateController = require("../controllers/updateController");
const { authenticateToken } = require("../middleware/auth");


router.post('/asignar-jefe', updateController.asignar_jefe);

module.exports = router;
