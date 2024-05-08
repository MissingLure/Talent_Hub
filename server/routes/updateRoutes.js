const express = require("express");
const router = express.Router();

const updateController = require("../controllers/updateController");
const { authenticateToken } = require("../middleware/auth");


router.post('/asignar-jefe', updateController.asignar_jefe);
router.put('/actualizar-empleado/:employeeID', updateController.actualizar_Empleado)
router.put('/actualizar-usuario/', updateController.actualizarUsuario)
module.exports = router;
