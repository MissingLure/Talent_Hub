const express = require("express");

const competenciasCtr = require("../controllers/competencias.controllers");

const router = express.Router();

router.get("/", competenciasCtr.getCompetenciasController);
router.get("/:id_competencia", competenciasCtr.getCompetenciaByIdController);
router.post("/", competenciasCtr.postCompetenciaController);
router.delete("/:id_competencia", competenciasCtr.deleteCompetenciaController);
router.put("/:id_competencia", competenciasCtr.putCompetenciaController)

module.exports = router;
