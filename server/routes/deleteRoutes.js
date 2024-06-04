const express = require("express");
const router = express.Router();

const deleteController = require("../controllers/deleteController");
const { authenticateToken } = require("../middleware/auth");

router.delete("/eliminar-comp-hab", deleteController.deleteHabilidadCompetencia);

router.delete('/eliminar-empleado')
module.exports = router;
