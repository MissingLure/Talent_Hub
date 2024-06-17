const db = require("../db");

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
      .where({
        id_empleado: id_empleado,
      })
      .join(
        "competencia_habilidad_pregunta",
        "evaluacion_competencias.id_competencia_habilidad_pregunta",
        "=",
        "competencia_habilidad_pregunta.id_competencia_habilidad_pregunta"
      )
      .join(
        "habilidad_pregunta",
        "competencia_habilidad_pregunta.id_competencia_habilidad_pregunta",
        "habilidad_pregunta.id_competencia_habilidad_pregunta"
      )
      .join(
        "competencia_habilidad",
        "habilidad_pregunta.id_competencia_habilidad",
        "=",
        "competencia_habilidad.id_competencia_habilidad"
      )
      .join(
        "competencias",
        "competencia_habilidad.id_competencia",
        "=",
        "competencias.id_competencia"
      )
      .select(
        "evaluacion_competencias.id_evaluacion_competencias",
        "competencias.nombre_competencia",
        "competencia_habilidad_pregunta.pregunta_habilidad",
        "evaluacion_competencias.resultado"
      );

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const selectEmpleadosWithEvaluacionesCompetenciaService = async() =>{
  try{

  } catch (error){

  }
}

module.exports = {
  selectEvaluacionCompetenciasByEmpleadoService,
  selectEvaluacionesCompetenciasService,
  selectEvaluacionCompetenciasService,
  insertEvaluacionCompetenciasService,
  updateEvaluacionCompetenciasService,
  deleteEvaluacionCompetenciasService,
};