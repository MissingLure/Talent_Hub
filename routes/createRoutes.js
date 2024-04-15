const express = require("express");
const router = express.Router();

const createController = require("../controllers/createController");
const { authenticateToken } = require("../middleware/auth");


router.post("/agregar-empleado", createController.agregar_empleado);
router.post("/crear-usuario", createController.crear_usuario);
router.post("/crear-pregunta", createController.crear_pregunta);
router.post("/crear-encuesta", createController.crear_encuesta);
router.post("/asignar-habilidades", createController.asignar_habilidades);

module.exports = router;
