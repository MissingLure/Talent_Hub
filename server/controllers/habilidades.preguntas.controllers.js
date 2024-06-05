const habilidadesPreguntasServ = require("../services/habilidades.preguntas.services");
const competenciasHabilidadesServ = require("../services/competencias.habilidades.services");

const validarCompetenciaHabilidad = async (id_competencia_habilidad) => {
  const findCompetenciaHabilidad =
    await competenciasHabilidadesServ.getCompetenciaHabilidadService(
      id_competencia_habilidad
    );

  if (findCompetenciaHabilidad.length === 0) {
    return false;
  } else {
    return true;
  }
};

const validarPreguntaHabilidad = async (pregunta_habilidad) => {
  const findPreguntaHabilidad =
    await habilidadesPreguntasServ.getHabilidadPreguntaService(
      pregunta_habilidad
    );

  if (findPreguntaHabilidad.length === 0) {
    return false;
  } else {
    return true;
  }
};

const getHabilidadPreguntasController = async (req, res) => {
  try {
    // Primeramente se verifica si la competencia_habilidad existe en la base de datos
    const exitsPreguntaHabilidad = await validarCompetenciaHabilidad(
      req.params.id_competencia_habilidad
    );

    if (!exitsPreguntaHabilidad) {
      return res
        .status(404)
        .send({ succes: false, message: "Habilidad no encontrada" });
    }
    // Si la competencia_habilidad existe, se procede a buscar las preguntas asociadas a la habilidad

    const result = await habilidadesPreguntasServ.getHabilidadPreguntasService(
      req.params.id_competencia_habilidad
    );

    return res.send({ succes: true, data: result });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const getHabilidadPreguntaController = async (req, res) => {
  try {
    const result = await habilidadesPreguntasServ.getHabilidadPreguntaService(
      req.params.id_competencia_habilidad_pregunta
    );

    if (result.length === 0)
      return res
        .status(404)
        .send({ succes: false, message: "Pregunta no encontrada" });

    return res.send({ succes: true, data: result });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const postHabilidadPreguntaController = async (req, res) => {
  try {
    const exitsPreguntaHabilidad = await validarCompetenciaHabilidad(
      req.params.id_competencia_habilidad
    );

    if (!exitsPreguntaHabilidad) {
      return res
        .status(404)
        .send({ succes: false, message: "Habilidad no encontrada" });
    }

    const result =
      await habilidadesPreguntasServ.insertHabilidadPreguntaService(
        req.params.id_competencia_habilidad,
        req.body
      );

    if (!result) {
      throw new Error("No se pudo insertar la pregunta");
    }

    return res.send({
      succes: true,
      message: "Pregunta insertada correctamente",
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const deleteHabilidadPreguntaController = async (req, res) => {
  try {
    const exitsPreguntaHabilidad = await validarPreguntaHabilidad(
      req.params.id_competencia_habilidad_pregunta
    );

    if (!exitsPreguntaHabilidad) {
      return res
        .status(404)
        .send({ succes: false, message: "Pregunta no encontrada" });
    }

    const result =
      await habilidadesPreguntasServ.deleteHabilidadPreguntaService(
        req.params.id_competencia_habilidad_pregunta
      );

    if (!result) throw new Error("No se pudo eliminar la pregunta");

    return res.send({
      succes: true,
      message: "Pregunta eliminada correctamente",
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const putHabilidadPreguntaController = async (req, res) => {
  try {
    const exitsPreguntaHabilidad = await validarPreguntaHabilidad(
      req.params.id_competencia_habilidad_pregunta
    );

    if (!exitsPreguntaHabilidad) {
      return res
        .status(404)
        .send({ succes: false, message: "Pregunta no encontrada" });
    }

    const result =
      await habilidadesPreguntasServ.updateHabilidadPreguntaService(
        req.params.id_competencia_habilidad_pregunta,
        req.body
      );

    if (!result) throw new Error("No se pudo actualizar la pregunta");

    return res.send({
      succes: true,
      message: "Pregunta actualizada correctamente",
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = {
  getHabilidadPreguntasController,
  getHabilidadPreguntaController,
  postHabilidadPreguntaController,
  deleteHabilidadPreguntaController,
  putHabilidadPreguntaController,
};
