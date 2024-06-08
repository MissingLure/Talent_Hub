const express = require("express");

const habilidadesPreguntasCtr = require("../controllers/habilidades.preguntas.controllers");

const router = express.Router();

// Ruta para obtener TODAS las preguntas asociadas a una habilidad
router.get(
  "/:id_competencia_habilidad",
  habilidadesPreguntasCtr.getHabilidadPreguntasController
);

// Ruta para agregar una pregunta a una habilidad
router.post(
  "/:id_competencia_habilidad",
  habilidadesPreguntasCtr.postHabilidadPreguntaController
);

// Ruta para obtener una pregunta en específico
router.get(
  "/pregunta/:id_competencia_habilidad_pregunta",
  habilidadesPreguntasCtr.getHabilidadPreguntaController
);

// Ruta para elimianr una pregunta en específico
router.delete("/pregunta/:id_competencia_habilidad_pregunta", habilidadesPreguntasCtr.deleteHabilidadPreguntaController);

// Ruta para actualizar una pregunta en especifico
router.put("/pregunta/:id_competencia_habilidad_pregunta", habilidadesPreguntasCtr.putHabilidadPreguntaController);

module.exports = router;
