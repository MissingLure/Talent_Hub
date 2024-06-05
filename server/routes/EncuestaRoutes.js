/*const express = require("express");
const router = express.Router();

const EncuestaController = require("../controllers/EncuestaController");
const { authenticateToken } = require("../middleware/auth");

router.post("/crear-encuestas",EncuestaController);
router.delete("//administrar-encuestas",EncuestaController)
module.exports = router;
*/

const express = require("express");
const router = express.Router();

const EntrevistaController = require("../controllers/EntrevistaController");
const authenticateToken = require("../middleware/auth");

// Ruta para crear una nueva entrevista
router.post(
  "/crear-entrevista-habilidad",
  authenticateToken,
  EntrevistaController.createEntrevistaHabilidad
);
// Ruta para obtener las preguntas de una entrevista específica
router.get(
  "/entrevista/:idEntrevistaHabilidad/preguntas",
  authenticateToken,
  EntrevistaController.getPreguntasEntrevistaHabilidad
);
// Ruta para crear una nueva entrevista
router.post(
  "/crear-entrevista-potencial",
  authenticateToken,
  EntrevistaController.createEntrevistaPotencial
);
// Ruta para obtener las preguntas de una entrevista específica
router.get(
  "/entrevista/:idEntrevistaPotencial/preguntas",
  authenticateToken,
  EntrevistaController.getPreguntasEntrevistaPotencial
);

module.exports = router;
