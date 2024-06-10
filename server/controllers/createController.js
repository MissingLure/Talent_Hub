const { response, request } = require("express");
const { isEmail, emptyFields, isPassword } = require("../utils/validator");
const createService = require("../services/createService");
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
    fecha_nacimiento: fechaNacimiento,
    id_perfil_puesto: idPerfilPuesto,
    id_departamento: idDepartamento,
  };

  if (emptyFields(empleado).length > 0) {
    errorMessages.push("No pueden haber campos vacíos.");
    return response.status(401).send({
      details: errorMessages,
    });
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
    const result = await createService.agregarEmpleado(empleado);
    console.log(result);
    if (result) {
      response.send({
        success: true,
        details: "Empleado agregado exitosamente.",
      });
    } else {
      errorMessages.push("Error al tratar de agregar empleado.");
      response.status(500).send({
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
    const result = await createService.crearUsuario(userData);
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

async function crear_competencia(req, res) {
  const errorMessages = [];

  const newCompetencia = req.body;

  if (emptyFields(newCompetencia).length > 0) {
    errorMessages.push("No se puede dejar campos vacios");
  }

  if (errorMessages.length) {
    return res.status(400).send({ details: errorMessages });
  }

  const result = await createService.crearCompetenciaService(newCompetencia);

  if (result) {
    return res.send({ success: "True", details: "Competencia Creada", result });
  } else {
    errorMessages.push("No se pudo crear la competencia");
    return res.status(500).send({ success: "False", details: errorMessages });
  }
}

async function crear_departamento(req, res) {
  const errorMessages = [];

  const newDepartamento = req.body;

  if (!newDepartamento.nombre_departamento)
    errorMessages.push("Debe de escribir un nombre del departamento");

  if (errorMessages.length) {
    return res.status(400).send({ details: errorMessages });
  }

  const result = await createService.crearDepartamentoService(newDepartamento);

  if (result) {
    return res.send({
      success: "True",
      details: "Departamento Creado",
      result,
    });
  } else {
    errorMessages.push("No se pudo crear la competencia");
    return res.status(500).send({ success: "False", details: errorMessages });
  }
}

async function crear_perfilPuesto(req, res) {
  const errorMessages = [];

  const newPerfilPuesto = req.body;

  const result = await createService.crearPerfilPuestoService(newPerfilPuesto);

  if (result) {
    return res.send({
      success: "True",
      details: "Perfil de Puesto Creado",
      result,
    });
  } else {
    errorMessages.push("No se pudo crear la competencia");
    return res.status(500).send({ success: "False", details: errorMessages });
  }
}

async function crear_requisito(req, res) {
  const errorMessages = [];

  const newRequisito = req.body;

  const result = await createService.crearRequisitoService(newRequisito);

  if (result) {
    return res.send({ success: "True", details: "Requisito Creado", result });
  } else {
    errorMessages.push("No se pudo crear el requisito");
    return res.status(500).send({ success: "False", details: errorMessages });
  }
}

async function crear_habilidad_competencia(req, res) {
  const errorMessages = [];

  const newHabilidadCompetencia = req.body;

  const result = await createService.crearHabilidadCompetenciaService(
    newHabilidadCompetencia
  );

  if (result) {
    return res.send({
      success: "True",
      details: "Habilida Competencia Creada",
      result,
    });
  } else {
    return res
      .status(500)
      .send({ success: "False", details: "No se pudo crear la habilida" });
  }
}

module.exports = {
  agregar_empleado,
  crear_usuario,
  crear_competencia,
  crear_departamento,
  crear_perfilPuesto,
  crear_requisito,
  crear_habilidad_competencia,
};
