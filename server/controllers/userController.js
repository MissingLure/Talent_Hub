const { response, request } = require("express");
const {
  getUserByEmail,
  getEmployeeById,
  getUserById,
  deleteEmpleadoById,
  deleteUsuarioById,
} = require("../services/userService");
const { encryptPassword } = require("../crypto/encryption");
const { emptyFields } = require("../utils/validator");

const jwt = require("jsonwebtoken");

async function login(request, response) {
  const errorMessages = [];
  try {
    const { email, password } = request.body;
    const userData = {
      email: email,
      password: password,
    };
    if (emptyFields(userData).length > 0) {
      errorMessages.push("No pueden haber campos vacíos");
    }
    const user = await getUserByEmail(email);
    if (!user) {
      errorMessages.push("Correo incorrecto.");
    }
    if (errorMessages.length) {
      response.status(401).send({
        success: false,
        details: errorMessages,
      });
    } else {
      const saltedPassword = encryptPassword(password, user.sal);
      if (user.contrasena === saltedPassword) {
        //Obtener datos del empleado
        const employee = await getEmployeeById(user.id_empleado);

        //Generar token
        console.log(process.env.TALENT_HUB_DB);
        const accessToken = jwt.sign(
          {
            email: user.correo,
            id_empleado: employee.id_empleado,
            primer_nombre: employee.primer_nombre,
            primer_apellido: employee.primer_apellido,
            rol: user.rol,
          },

          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
          }
        );

        console.log(process.env.TALENT_HUB_DB);

        const refreshToken = jwt.sign(
          {
            email: user.correo,
            id_empleado: employee.id_empleado,
            primer_nombre: employee.primer_nombre,
            primer_apellido: employee.primer_apellido,
            rol: user.rol,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
          }
        );
        response.send({
          success: true,
          details: "Datos válidos.",
          data: employee,
          rol: user.rol,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        errorMessages.push("Contraseña incorrecta.");
        response.status(401).send({
          success: false,
          details: errorMessages,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function get_user(request, response) {
  const errorMessages = [];
  try {
    const { employeeId } = request.body;
    const user = await getUserById(employeeId);
    if (user) {
      response.send({
        success: true,
        data: user,
      });
    } else {
      errorMessages.push("El empleado no tiene usuario.");
      response.send({
        success: false,
        details: errorMessages,
      });
    }
  } catch (error) {
    errorMessages.push("Error al tratar de obtener datos.");
    response.status(401).send({
      success: false,
      details: errorMessages,
    });
  }
}


async function deleteEmpleado (req, res) {
  try {
      const { id } = req.params;
      const result = await deleteEmpleadoById(id);
      if (result) {
          res.status(200).send({ message: 'Employee deleted successfully' });
      } else {
          res.status(404).send({ message: 'Employee not found' });
      }
  } catch (error) {
      res.status(500).send({ message: 'Error deleting employee', error });
  }
};

async function deleteUsuario (req, res) {
  try {
    const { id } = req.params;
    const result = await deleteUsuarioById(id);
    if (result) {
        res.status(200).send({ message: 'User deleted successfully' });
    } else {
        res.status(404).send({ message: 'User not found jajaxd que cosas' });
    }
} catch (error) {
    res.status(500).send({ message: 'Error deleting user', error });
}
}

module.exports = {
  login,
  get_user,
  deleteEmpleado,
  deleteUsuario,
};
