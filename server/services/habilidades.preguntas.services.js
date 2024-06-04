const db = require("../db");

const getHabilidadPreguntasService = async (id_competencia_habilidad) => {
  try {
    const result = await db("habilidad_pregunta")
      .join(
        "competencia_habilidad_pregunta",
        "habilidad_pregunta.id_competencia_habilidad_pregunta",
        "competencia_habilidad_pregunta.id_competencia_habilidad_pregunta"
      )
      .where({ id_competencia_habilidad })
      .select(
        "competencia_habilidad_pregunta.id_competencia_habilidad_pregunta",
        "competencia_habilidad_pregunta.resumen",
        "competencia_habilidad_pregunta.pregunta_habilidad"
      );

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const getHabilidadPreguntaService = async (
  id_competencia_habilidad_pregunta
) => {
  try {
    const result = await db("competencia_habilidad_pregunta")
      .where({ id_competencia_habilidad_pregunta })
      .select();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const findHabilidadPreguntaByPreguntaService = async (pregunta_habilidad) => {
  try {
    const result = await db("competencia_habilidad_pregunta")
      .where({ pregunta_habilidad })
      .select("id_competencia_habilidad_pregunta");

    return result[0];
  } catch (error) {
    console.log(error);

    return null;
  }
};

const insertHabilidadPreguntaService = async (
  id_competencia_habilidad,
  newPregunta
) => {
  try {
    /*
    Insertamos la pregunta en la tabla competencia_habilidad_pregunta, como estamos usando mysql,
    no encontre un metodo para obtener el id de la pregunta que acabamos de insertar, por lo que
    tuve que hacer una consulta para obtener el id de la pregunta que acabamos de insertar.

    findHabilidadPreguntaByPreguntaService es un metodo que busca la pregunta en la tabla basado en
    el campo pregunta_habilidad, y retorna el un objeto, que tiene un atributo id_competencia_habilidad_pregunta,

    Una vez tenemos el id de la pregunta insertada recientemente, insertamos en la tabla habilidad_pregunta
    el id de la competencia_habilidad y el id de la competencia_habilidad_pregunta que acabamos de insertar.

    Asi relacionamos la pregunta insertada con la habilidad que hemos mandado como un param.
    */

    const resultInsertPregunta = await db(
      "competencia_habilidad_pregunta"
    ).insert(newPregunta);

    const { id_competencia_habilidad_pregunta } =
      await findHabilidadPreguntaByPreguntaService(
        newPregunta.pregunta_habilidad
      );

    const resultInsertHabilidadPregunta = await db("habilidad_pregunta").insert(
      {
        id_competencia_habilidad,
        id_competencia_habilidad_pregunta,
      }
    );

    return resultInsertHabilidadPregunta;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteHabilidadPreguntaService = async (
  id_competencia_habilidad_pregunta
) => {
  try {
    /*
    Definimos que CADA pregunta deberia estar relacionada con UNA habilidad, por lo que
    lo primero seria eliminar el registro que relaciona la pregunta con la habilidad.

    Despues eliminamos la pregunta de la tabla competencia_habilidad_pregunta.
    */

    await db("habilidad_pregunta")
      .where({ id_competencia_habilidad_pregunta })
      .delete();

    const result = await db("competencia_habilidad_pregunta")
      .where({ id_competencia_habilidad_pregunta })
      .delete();

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const updateHabilidadPreguntaService = async (id_competencia_habilidad_pregunta, values) => { 

  try {
    const result = await db("competencia_habilidad_pregunta")
      .where({ id_competencia_habilidad_pregunta })
      .update(values);

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }

}

module.exports = {
  getHabilidadPreguntasService,
  getHabilidadPreguntaService,
  deleteHabilidadPreguntaService,
  insertHabilidadPreguntaService,
  updateHabilidadPreguntaService,
  findHabilidadPreguntaByPreguntaService
};
