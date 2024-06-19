const express = require("express");
const router = express.Router();

const entrevistasCompetenciaController = require("../controllers/entrevistasCompetenciaController");

router.get("/obtener-entrevistas-competencia", entrevistasCompetenciaController.obtenerEntrevistas);
router.get("/obtener-por-id-entrevistas-competencia/:id_entrevistas_competencia", entrevistasCompetenciaController.obtenerEntrevistaPorId);
router.get("/obtener-por-id-perfil-puesto/:id_perfil_puesto", entrevistasCompetenciaController.obtenerEntrevistaPorPuesto);
router.post("/agregar-entrevistas-competencia", entrevistasCompetenciaController.insertarEntrevista);
router.put("/actualizar-entrevistas-competencia/:id_entrevistas_competencia", entrevistasCompetenciaController.actualizarEntrevista);
router.delete("/eliminar-entrevistas-competencia/:id_entrevistas_competencia", entrevistasCompetenciaController.eliminarEntrevista);

module.exports = router;
