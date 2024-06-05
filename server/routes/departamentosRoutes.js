const express = require("express");
const departamentos = require("../controllers/departamentosController");
const router = express.Router();

//departamentos

router.get('/departamentos', departamentos.obtenerAllDepartamentosHandler);
router.get('/departamento/:id_departamento', departamentos.obtenerDepartamento_porIDHandler);
router.post('/departamento', departamentos.agregarDepartamentoHandler);
router.put('/departamento/:id_departamento', departamentos.updateDepartamentoHandler);
router.delete('/departamento/:id_departamento', departamentos.borrarDepartamentoHandler);

module.exports = router;