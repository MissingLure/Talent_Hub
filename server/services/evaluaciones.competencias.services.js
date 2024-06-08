const db = require("../db");

const SelectEvalucionesPendientes = async () => {
  try {
    const result = await db('evaluacion_competencias as ecp')
  .whereNull('ecp.resultado')
  .select('ecp.id_evaluacion_competencias')
  return result;
  } catch (error) {
    console.log(error);

    return null;
  }
}

const selectEvaluacionesCompetenciasService = async () => {
  try {
    const result = await db("evaluacion_competencias").select();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const selectEvaluacionCompetenciasService = async (
  id_evaluacion_competencias
) => {
  try {
    const result = await db("evaluacion_competencias")
      .where({ id_evaluacion_competencias })
      .select();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const insertEvaluacionCompetenciasService = async (
  newEvaluacionCompetencias
) => {
  try {
    const result = await db("evaluacion_competencias").insert(
      newEvaluacionCompetencias
    );

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const updateEvaluacionCompetenciasService = async (
  id_evaluacion_competencias,
  values
) => {
  try {
    const result = await db("evaluacion_competencias")
      .where({ id_evaluacion_competencias })
      .update(values)
      .returning("*");

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const deleteEvaluacionCompetenciasService = async (
  id_evaluacion_competencias
) => {
  try {
    const result = await db("evaluacion_competencias")
      .where({ id_evaluacion_competencias })
      .del()
      .returning("*");

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const selectEvaluacionCompetenciasByEmpleadoService = async (id_empleado) => {
  try {
    const result = await db("evaluacion_competencias")
      .where({ id_empleado })
      .select(
        "id_evaluacion_competencias",
        "id_competencia_habilidad_pregunta",
        "resultado"
      );

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

module.exports = {
  selectEvaluacionCompetenciasByEmpleadoService,
  selectEvaluacionesCompetenciasService,
  selectEvaluacionCompetenciasService,
  insertEvaluacionCompetenciasService,
  updateEvaluacionCompetenciasService,
  deleteEvaluacionCompetenciasService,
  SelectEvalucionesPendientes,
};
