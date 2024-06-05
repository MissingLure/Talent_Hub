const db = require("../db");

const getCompetenciasService = async () => {
  try {
    const result = await db.select().table("competencias");

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const getCompetenciaService = async (id_competencia) => {
  try {
    const result = await db("competencias").where({ id_competencia }).select();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const updateCompetenciaService = async (id_competencia, values) => {
  try {
    const result = await db("competencias")
      .where({ id_competencia })
      .update(values);

      return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const insertCompetenciaService = async (newCompetencia) => {
  try {
    const result = await db("competencias").insert(newCompetencia);

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const deleteCompetenciaService = async (id_competencia) => {
  try {
    const result = await db("competencias").where({ id_competencia }).delete();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

module.exports = {
  getCompetenciasService,
  getCompetenciaService,
  insertCompetenciaService,
  deleteCompetenciaService,
  updateCompetenciaService
};
