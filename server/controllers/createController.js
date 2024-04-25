const { response, request } = require("express");
const { isEmail, emptyFields, isPassword } = require("../utils/validator");
const {
  agregarEmpleado,
  crearUsuario,
  crearCompetencia,
  crearPregunta,
  crearEncuesta,
  crearPreguntaEncuesta,
  insertarHabilidades,
} = require("../services/createService");
const { encryptPassword, generateSalt } = require("../crypto/encryption");
const { emailExists, employeeExists } = require("./validationController");

async function agregar_empleado(request, response) {
  const errorMessages = [];
  const {
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    telefono,
    numeroIdentidad,
    direccion,
    correo,
    fechaNacimiento,
    idPerfilPuesto,
    idDepartamento,
  } = request.body;

  const empleado = {
    primer_nombre: primerNombre,
    segundo_nombre: segundoNombre,
    primer_apellido: primerApellido,
    segundo_apellido: segundoApellido,
    telefono: telefono,
    numero_identidad: numeroIdentidad,
    direccion: direccion,
    correo: correo,
    fecha_nacimiento: fechaNacimiento,
    id_perfil_puesto: idPerfilPuesto,
    id_departamento: idDepartamento,
  };

  if (emptyFields(empleado).length > 0) {
    errorMessages.push("No pueden haber campos vacíos.");
  }

  if (!isEmail(correo)) {
    errorMessages.push("El correo ingresado tiene un formato incorrecto.");
  }

  if (await emailExists(correo)) {
    errorMessages.push("El correo ingresado ya existe.");
  }

  if (await employeeExists(numeroIdentidad)) {
    errorMessages.push("El empleado ya existe.");
  }

  if (errorMessages.length) {
    response.status(400).send({
      details: errorMessages,
    });
  } else {
    //Si no hay ningun problema con los datos
    const result = await agregarEmpleado(empleado);
    if (result) {
      response.send({
        success: true,
        details: "Empleado agregado exitosamente.",
      });
    } else {
      errorMessages.push("Error al tratar de agregar empleado.");
      response.send({
        success: false,
        details: errorMessages,
      });
    }
  }
}

async function crear_usuario(request, response) {
  const errorMessages = [];
  const { idEmpleado, rol, correo, contrasena } = request.body;
  const userData = {
    id_empleado: idEmpleado,
    correo: correo,
    contrasena: contrasena,
    sal: "sal",
    rol: rol,
  };
  if (!isEmail(correo)) {
    errorMessages.push("Formato de correo invalido.");
  }
  if (!isPassword(contrasena)) {
    errorMessages.push("Formato de contraseña invalido.");
  }
  if (emptyFields(userData).length > 0) {
    errorMessages.push("No puede dejar campos vacíos.");
  }

  if (await emailExists(correo)) {
    errorMessages.push("Usuario ya existe.");
  }

  if (errorMessages.length) {
    response.status(400).send({ details: errorMessages });
  } else {
    //Si los datos entan correctos continuar
    const salt = generateSalt();
    const encryptedPassword = encryptPassword(contrasena, salt);
    userData.contrasena = encryptedPassword;
    userData.sal = salt;
    const result = await crearUsuario(userData);
    if (result) {
      response.send({
        success: true,
        details: "Usuario creado exitosamente.",
      });
    } else {
      errorMessages.push("Error al tratar de crear usuario.");
      response.send({
        success: false,
        details: errorMessages,
      });
    }
  }
}

async function crear_pregunta(request, response) {
  const errorMessages = [];
  const {
    idCompetencia,
    idHabilidad,
    pregunta,
    comportamiento,
    lenguaje,
    tipo,
  } = request.body;
  const preguntaData = {
    id_competencia: idCompetencia,
    id_habilidad: idHabilidad,
    pregunta: pregunta,
    comportamiento: comportamiento,
    lenguaje: lenguaje,
    tipo: tipo,
  };
  if (emptyFields(preguntaData).length > 0) {
    console.log("Hay campos vacios.");
    errorMessages.push("No pueden haber campos vacíos.");
    response.status(401).send({
      success: false,
      details: errorMessages,
    });
  } else {
    const result = await crearPregunta(preguntaData);
    if (result) {
      response.send({
        success: true,
        details: "Pregunta creada exitosamente.",
      });
    } else {
      errorMessages.push("Error al tratar de crear pregunta.");
      response.send({
        success: false,
        details: errorMessages,
      });
    }
  }
}

async function crear_encuesta(request, response) {
  const preguntasArr = [];
  const errorMessages = [];
  const { tipoEncuesta, nombreEncuesta, lenguaje, preguntas } = request.body;
  const encuestaData = {
    tipo_encuesta: tipoEncuesta,
    nombre_encuesta: nombreEncuesta,
    lenguaje: lenguaje,
  };

  if (emptyFields(encuestaData).length > 0) {
    errorMessages.push("No pueden haber campos vacíos.");
    response.status(401).send({
      success: false,
      details: errorMessages,
    });
  } else {
    const idEncuesta = await crearEncuesta(encuestaData);
    for (const pregunta of preguntas) {
      preguntasArr.push({ id_encuesta: idEncuesta, pregunta: pregunta });
    }

    for (const pregunta of preguntasArr) {
      const result = await crearPreguntaEncuesta(pregunta);
      console.log(result);
    }

    response.send({
      success: true,
      details: "Encuesta creada exitosamente.",
    });
  }
}

async function asignar_habilidades(request, response) {
  const { idPuesto, habilidades } = request.body;
  for (const habilidad of habilidades) {
    const result = await insertarHabilidades({
      id_pefil_puesto: idPuesto,
      id_habilidad: habilidad.idHabilidad,
    });
  }
}

module.exports = {
  agregar_empleado,
  crear_usuario,
  crear_pregunta,
  crear_encuesta,
  asignar_habilidades,
};
