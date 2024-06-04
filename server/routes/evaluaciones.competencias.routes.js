const express = require("express");

const evaluacionesCompetenciasCtr = require("../controllers/evaluaciones.competencias.controllers");
const router = express.Router();

router.get(
  "/",
  evaluacionesCompetenciasCtr.getEvaluacionesCompetenciasController
);

router.get(
  "/:idEvaluacionCompetencias",
  evaluacionesCompetenciasCtr.getEvaluacionCompetenciasController
);

router.post(
  "/",
  evaluacionesCompetenciasCtr.postEvaluacionCompetenciasController
);

router.put(
  "/:idEvaluacionCompetencias",
  evaluacionesCompetenciasCtr.putEvaluacionCompetenciasController
);

router.delete(
  "/:idEvaluacionCompetencias",
  evaluacionesCompetenciasCtr.deleteEvaluacionCompetenciasController
);

router.get(
  "/by-empleado/:idEmpleado",
  evaluacionesCompetenciasCtr.getEvaluacionesCompetenciasByEmpleadoController
);

module.exports = router;
