const express = require("express");
const router = express.Router();
const evaluationController = require("../controllers/evaluationController");


router.put("/actualizar-Resultado", evaluationController.updateResultadoEvaluacion);
router.get("/Obtener-evaluaciones-empleado", evaluationController.GetEvaluacionesDesmpenoById);
router.post("/crear-evaluacion-Desempeño", evaluationController.createEvalucionDesempeno);

module.exports = router;
