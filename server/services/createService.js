const { DB_Config } = require("../config.js");
const crypto = require("crypto");
const { async } = require("q");

const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: DB_Config.TALENT_HUB_SERVER,
    port: DB_Config.TALENT_HUB_PORT,
    user: DB_Config.TALENT_HUB_USER,
    password: DB_Config.TALENT_HUB_PASSWORD,
    database: DB_Config.TALENT_HUB_DB,
  },
});

async function agregarEmpleado(empleado) {
  try {
    const result = await knex.raw("CALL CrearEmpleado(?,?,?,?,?,?,?,?,?,?);", [
      empleado.primer_nombre,
      empleado.segundo_nombre,
      empleado.primer_apellido,
      empleado.segundo_apellido,
      empleado.telefono,
      empleado.fecha_nacimiento,
      empleado.numero_identidad,
      empleado.direccion,
      empleado.id_perfil_puesto,
      empleado.id_departamento,
    ]);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function crearUsuario(usuarioData) {
  try {
    const result = await knex("usuarios")
      .insert(usuarioData)
      .returning("id_competencia");

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function crearCompetenciaService(newCompetencia) {
  try {
    const result = await knex("competencias").insert(newCompetencia);

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function crearDepartamentoService(newDepartamento) {
  try {
    const { nombre_departamento, id_jefe } = newDepartamento;

    const result = await knex.raw(
      `INSERT INTO departamentos(id_departamento, nombre_departamento,
    id_jefe) VALUES(GENERAR_ID_DEPARTAMENTO(), ?, ?)`,
      [nombre_departamento, id_jefe]
    );

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function crearPerfilPuestoService(newPerfilPuesto) {
  try {
    const { nombre_perfil, id_departamento, numero_plazas, id_requisito } =
      newPerfilPuesto;

    const result = await knex.raw(
      `INSERT INTO perfiles_puestos VALUES(GENERAR_ID_PERFIL_PUESTO(), ?, ?, ?, ?)`,
      [nombre_perfil, id_departamento, numero_plazas, id_requisito]
    );

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function crearRequisitoService(newRequisito) {
  try {
    const result = await knex("requisitos").insert(newRequisito);

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}
/*
async function crearHabilidadCompetenciaService(newHabilidadCompetencia) {
  try {
    const result = await knex("competencia_habilidad").insert(
      newHabilidadCompetencia
    );

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}
*/
async function crearHabilidadCompetenciaService(newHabilidadCompetencia) {
  try {
    const result = await knex("competencia_habilidad").insert({
      id_competencia_habilidad:
        newHabilidadCompetencia.id_competencia_habilidad,
      id_competencia: newHabilidadCompetencia.id_competencia,
      nombre_habilidad: newHabilidadCompetencia.nombre_habilidad,
      comportamiento_habilidad:
        newHabilidadCompetencia.comportamiento_habilidad,
      pregunta_habilidad: newHabilidadCompetencia.pregunta_habilidad,
    });

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function insertarCompetenciaHabilidad(req, res) {
  const errorMessages = [];

  const {
    id_comp_hab,
    idCompetencia,
    nombreHabilidad,
    comportamientoHabilidad,
    preguntaHabilidad,
  } = req.body;

  // Validate input data
  if (
    !id_comp_hab ||
    !idCompetencia ||
    !nombreHabilidad ||
    !comportamientoHabilidad ||
    !preguntaHabilidad
  ) {
    errorMessages.push("All fields are required");
  }

  if (errorMessages.length) {
    return response.status(400).send({ details: errorMessages });
  }

  try {
    // Insert data into the table
    await knex("competencia_habilidad").insert({
      id_competencia_habilidad: id_comp_hab,
      id_competencia: idCompetencia,
      nombre_habilidad: nombreHabilidad,
      comportamiento_habilidad: comportamientoHabilidad,
      pregunta_habilidad: preguntaHabilidad,
    });

    console.log("Data inserted successfully");

    return response.send({
      success: true,
      details: "Competencia Habilidad created",
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    return response
      .status(500)
      .send({
        success: false,
        details: "Failed to create Competencia Habilidad",
      });
  }
}

module.exports = {
  agregarEmpleado,
  crearUsuario,
  crearCompetenciaService,
  crearDepartamentoService,
  crearPerfilPuestoService,
  crearRequisitoService,
  crearHabilidadCompetenciaService,
  insertarCompetenciaHabilidad,
};
