const express = require("express");

const compHabCtr = require("../controllers/competencias.habilidades.controllers");

const router = express.Router();

router.get("/", compHabCtr.getCompetenciaHabilidadesController);
router.get(
  "/:id_competencia_habilidad",
  compHabCtr.getCompetenciaHabilidadByIdController
);
router.get(
  "/by-competencia/:id_competencia",
  compHabCtr.getCompetenciaHabilidadesByCompetenciaController
);
router.post("/", compHabCtr.postCompetenciaHabilidadController);
router.delete("/:id_competencia_habilidad", compHabCtr.deleteCompetenciaHabilidadController);
router.put(
  "/:id_competencia_habilidad",
  compHabCtr.putCompetenciaHabilidadController
);

module.exports = router
