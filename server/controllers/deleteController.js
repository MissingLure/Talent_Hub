const { response, request } = require("express");
const { encryptPassword, generateSalt } = require("../crypto/encryption");
const { emailExists, employeeExists } = require("./validationController");