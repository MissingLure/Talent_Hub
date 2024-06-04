const express = require("express");
const gridBox = require("../controllers/gridBoxController");
const router = express.Router();

//gridbox

router.delete('/grid-borrar/:id_empleado', gridBox.borrarEmpleadoHandler);
router.post('/addGrid', gridBox.agregarGridBoxHandler);
router.get('/gridboxes', gridBox.obtenerAllGridBoxesHandler);
router.put('/gridbox/:id_empleado', gridBox.updateGridBoxHandler);
router.get('/gridbox/:id_empleado', gridBox.obtenerGridBox_porID_Handler);

module.exports = router;

