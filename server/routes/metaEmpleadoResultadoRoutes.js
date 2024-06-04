const express = require("express");
const router = express.Router();

const metaEmpleadoResultadoController = require("../controllers/metaEmpleadoResultadoController");
const { authenticateToken } = require("../middleware/auth");  

router.get("/obtener-metas-empleado-resultado", metaEmpleadoResultadoController.obtenerMetasEmpleadoResultado);
router.post("/agregar-meta-empleado-resultado", metaEmpleadoResultadoController.insertarMetaEmpleadoResultado);
router.put("/actualizar-meta-empleado-resultado/:id_metas_empleado_resultado", metaEmpleadoResultadoController.actualizarMetaEmpleadoResultado);
router.delete("/eliminar-meta-empleado-resultado/:id_metas_empleado_resultado", metaEmpleadoResultadoController.eliminarMetaEmpleadoResultado);

module.exports = router;
