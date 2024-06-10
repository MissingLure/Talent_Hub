const express = require("express"); 
const router = express.Router(); 
 
const paisesController = require("../controllers/paisesController"); 

router.get("/obtener-paises", paisesController.GetAllPais); 
router.post("/agregar-pais", paisesController.insertarPais);

module.exports = router; 