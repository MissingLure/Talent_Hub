const db = require("../db");

const getCompetenciaHabilidadesService = async () => {
  try {
    const result = await db.select().table("competencia_habilidad");

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const getCompetenciaHabilidadService = async (id_competencia_habilidad) => {
  try {
    const result = await db("competencia_habilidad").where({ id_competencia_habilidad }).select();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const getCompetenciaHabilidadesByCompetencia = async (id_competencia) => {
  try {
    
    const result = await db("competencia_habilidad").where({id_competencia}).select();

    return result;

  } catch (error) {
    console.log(error)

    return null;
    
  }
}

const updateCompetenciaHabilidadService = async (id_competencia_habilidad, values) => {
  try {
    const result = await db("competencia_habilidad")
      .where({ id_competencia_habilidad})
      .update(values);

      return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const insertCompetenciaHabilidadService = async (newCompetenciaHabilidad) => {
  try {
    const result = await db("competencia_habilidad").insert(newCompetenciaHabilidad);

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const deleteCompetenciaHabilidadService = async (id_competencia_habilidad) => {
  try {
    const result = await db("competencia_habilidad").where({ id_competencia_habilidad}).delete();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

module.exports = {
  getCompetenciaHabilidadesService,
  getCompetenciaHabilidadService,
  getCompetenciaHabilidadesByCompetencia,
  insertCompetenciaHabilidadService,
  deleteCompetenciaHabilidadService,
  updateCompetenciaHabilidadService

};
