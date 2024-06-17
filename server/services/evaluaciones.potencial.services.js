const db = require("../db");

const SelectEvalucionesPendientes = async () => {
  try {
    const result = await db('evaluacion_potencial as ecp')
  .whereNull('ecp.resultado')
  .select('ecp.id_evaluacion_potencial')
  return result;
  } catch (error) {
    console.log(error);

    return null;
  }
}

const selectEvaluacionesPotencialService = async () => {
  try {
    const result = await db("evaluacion_potencial").select();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const selectEvaluacionPotencialService = async (
  id_evaluacion_potencial
) => {
  try {
    const result = await db("evaluacion_potencial")
      .where({ id_evaluacion_potencial })
      .select();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const insertEvaluacionPotencialService = async (
  newEvaluacionCompetencias
) => {
  try {
    const result = await db("evaluacion_potencial").insert(
      newEvaluacionCompetencias
    );

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const updateEvaluacionPotencialService = async (
  id_evaluacion_potencial,
  values
) => {
  try {
    const result = await db("evaluacion_potencial")
      .where({ id_evaluacion_potencial })
      .update(values)
      .returning("*");

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const deleteEvaluacionPotencialService = async (
  id_evaluacion_potencial
) => {
  try {
    const result = await db("evaluacion_potencial")
      .where({ id_evaluacion_potencial })
      .del()
      .returning("*");

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const selectEvaluacionPotencialByEmpleadoService = async (id_empleado) => {
  try {
    const result = await db("evaluacion_potencial")
      .where({ id_empleado })
      .select(
        "id_evaluacion_potencial",
        "Fecha_limite",
        "resultado"
      );

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

module.exports = {
  selectEvaluacionPotencialByEmpleadoService,
  selectEvaluacionesPotencialService,
  selectEvaluacionPotencialService,
  insertEvaluacionPotencialService,
  updateEvaluacionPotencialService,
  deleteEvaluacionPotencialService,
  SelectEvalucionesPendientes,
};
