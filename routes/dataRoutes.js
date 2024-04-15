const express = require("express");
const router = express.Router();

const dataController = require("../controllers/dataController");
const { authenticateToken } = require("../middleware/auth");


router.get('/obtener-departamentos', dataController.obtener_departamentos);
router.get('/obtener-puestos', dataController.obtener_puestos);
router.post('/obtener-empleado', dataController.obtener_empleado);
router.get('/obtener-competencias', dataController.obtener_competencias);
router.get('/obtener-comportamientos', dataController.obtener_comportamientos_por_competencia);
router.get('/obtener-evaluaciones', dataController.obtener_evaluaciones);
router.get('/obtener-preguntas', dataController.obtener_preguntas);
router.get('/obtener-empleados', dataController.obtener_empleados);
router.get('/obtener-habilidades', dataController.obtener_habilidades);
router.post('/obtener-competencia-por-id', dataController.obtener_competencia_por_id);
router.get('/obtener-jefes', dataController.obtener_jefes);
router.post('/obtener-jefe-por-empleado', dataController.get_boss_by_employee);
router.post('/obtener-jefe-por-empleado', dataController.get_boss_by_employee);
router.post('/obtener-empleados-por-jefe', dataController.get_employees_by_boss);
router.get('/obtener-encuestas', dataController.obtener_encuestas);
router.post('/obtener-habilidades-por-puesto', dataController.obtener_habilidades_por_puesto);
router.post('/obtener-evaluacion', dataController.obtener_evaluacion);


module.exports = router;
