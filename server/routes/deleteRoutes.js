const express = require("express");
const router = express.Router();

const deleteController = require("../controllers/deleteController");
const { authenticateToken } = require("../middleware/auth");

module.exports = router;
