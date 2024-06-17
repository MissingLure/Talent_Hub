const express = require('express');
const router = express.Router();

const competenciasPorPuestoController = require('../controllers/competenciasPuestosController');
const { authenticateToken } = require('../middleware/auth');

router.get('/:id_perfil_puesto', competenciasPorPuestoController.obtenerCompetenciasPorPuesto);
router.delete('/:id_perfil_puesto', competenciasPorPuestoController.deleteCompetenciaAPuesto);
router.post('/', competenciasPorPuestoController.agregarCompetenciaAPuesto);


module.exports = router;
