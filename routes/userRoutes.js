const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post('/get-user', userController.login);
router.post('/get-employee-user', userController.get_user);

module.exports = router;
