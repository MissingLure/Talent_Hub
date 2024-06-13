const express = require("express");

const evaluacionesPotencialCtr = require("../controllers/evaluaciones.potencial.controllers");
const router = express.Router();

router.get(
  "/",
  evaluacionesPotencialCtr.getEvaluacionesPotencialController
);

router.get(
  "/evaluaciones-pendientes",
  evaluacionesPotencialCtr.SelectEvalucionesPendientes
);

router.get(
  "/:idEvaluacionPotencial",
  evaluacionesPotencialCtr.getEvaluacionPotencialController
);

router.post(
  "/",
  evaluacionesPotencialCtr.postEvaluacionPotencialController
);

router.put(
  "/:idEvaluacionPotencial",
  evaluacionesPotencialCtr.putEvaluacionPotencialController
);

router.delete(
  "/:idEvaluacionPotencial",
  evaluacionesPotencialCtr.deleteEvaluacionPotencialController
);

router.get(
  "/by-empleado/:idEmpleado",
  evaluacionesPotencialCtr.getEvaluacionesPotencialByEmpleadoController
);

module.exports = router;
