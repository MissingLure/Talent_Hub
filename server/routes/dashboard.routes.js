const express = require("express");

const dashboardCtr = require("../controllers/dashboard.controllers");

const router = express.Router();

router.get("/", dashboardCtr.getDashboardController);
router.get("/:id_empleado", dashboardCtr.getEmpleadoByIdController);
router.get("/:id_empleado", dashboardCtr.getDepartamentoByIdController);
router.get("/:id_empleado", dashboardCtr.getPuestoByIdController);

module.exports = router;