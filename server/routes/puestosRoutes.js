const express = require("express"); 
const router = express.Router(); 
 
const puestosController = require("../controllers/puestosController"); 
const { authenticateToken } = require("../middleware/auth");   
 
router.get("/obtener-puestos", puestosController.obtenerPuestos); 
router.post("/agregar-puesto", puestosController.insertarPuesto); 
router.put("/actualizar-puesto", puestosController.actualizarPuesto); 
router.delete("/eliminar-puesto", puestosController.eliminarPuesto); 
 
module.exports = router; 
