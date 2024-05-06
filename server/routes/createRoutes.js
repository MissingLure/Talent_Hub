const express = require("express");
const router = express.Router();

const createController = require("../controllers/createController");
const { authenticateToken } = require("../middleware/auth");

router.post("/agregar-empleado", createController.agregar_empleado);
router.post("/crear-usuario", createController.crear_usuario);
router.post("/crear-competencia", createController.crear_competencia);
router.post("/crear-departamento", createController.crear_departamento);
router.post("/crear-perfil-puesto", createController.crear_perfilPuesto);

router.post("/crear-requisito", createController.crear_requisito);
router.post("/crear-habilidad-competencia", createController.crear_habilidad_competencia);

module.exports = router;
