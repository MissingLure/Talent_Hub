const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post('/get-user', userController.login);
router.post('/get-employee-user', userController.get_user);
router.delete('/delete-employee/:id', userController.deleteEmpleado);
router.delete('/delete-user/:id', userController.deleteUsuario);

module.exports = router;
