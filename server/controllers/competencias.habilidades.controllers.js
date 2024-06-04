const competenciaHabilidadesServ = require("../services/competencias.habilidades.services");
const preguntaHabilidadServ = require("../services/habilidades.preguntas.services");

const {
  validarCompetencia,
} = require("../controllers/competencias.controllers");

const validarHabilidad = async (id_competencia_habilidad) => {
  const findHabilidad =
    await competenciaHabilidadesServ.getCompetenciaHabilidadService(
      id_competencia_habilidad
    );

  if (findHabilidad.length === 0) {
    return false;
  } else {
    return true;
  }
};

const getCompetenciaHabilidadesController = async (req, res) => {
  try {
    const result =
      await competenciaHabilidadesServ.getCompetenciaHabilidadesService();

    return res.send({ succes: true, data: result });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const getCompetenciaHabilidadByIdController = async (req, res) => {
  try {
    const result =
      await competenciaHabilidadesServ.getCompetenciaHabilidadService(
        req.params.id_competencia_habilidad
      );

    if (result.length === 0) {
      return res
        .status(404)
        .send({ succes: false, message: "Habilidad no encontrada" });
    }

    return res.send({ succes: true, data: result[0] });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getCompetenciaHabilidadesByCompetenciaController = async (req, res) => {
  try {
    /*
    Lo primero que debemos hacer es verificar si la competencia existe en la base de datos, 
    la funcion validarCompetencia retorna un booleano para validar la exitencia de la competencia.

    El estatus 404 se envia cuando tenemos algun error con la competencia, porque es un informacion
    internar que se requiere para las habilidades.
    */
    const existCompetencia = await validarCompetencia(
      req.params.id_competencia
    );

    if (!existCompetencia) {
      return res
        .status(404)
        .send({ succes: false, message: "Competencia no encontrada" });
    }

    const result =
      await competenciaHabilidadesServ.getCompetenciaHabilidadesByCompetencia(
        req.params.id_competencia
      );

    return res.send({ succes: true, data: result });
  } catch (error) {
    res.status(500).send({ succes: false, message: error });
  }
};

const postCompetenciaHabilidadController = async (req, res) => {
  try {
    const existCompetencia = await validarCompetencia(req.body.id_competencia);

    if (!existCompetencia) {
      return res
        .status(404)
        .send({ succes: false, message: "Competencia no encontrada" });
    }

    const newCompetenciaHabilidad = req.body;

    const result =
      await competenciaHabilidadesServ.insertCompetenciaHabilidadService(
        newCompetenciaHabilidad
      );

    if (result) res.send({ succes: true, message: "Habilidad creada", result });
  } catch (error) {
    return res.status(500).send({ succes: false, error });
  }
};

const putCompetenciaHabilidadController = async (req, res) => {
  try {
    const result =
      await competenciaHabilidadesServ.updateCompetenciaHabilidadService(
        req.params.id_competencia_habilidad,
        req.body
      );

    if (result === 0)
      return res.status(400).send({
        succes: false,
        message: "No se pudo actualizar la habilidad",
      });

    return res.send({
      succes: true,
      message: "Competencia Habilidad Actualizada",
    });
  } catch (error) {
    return res.status(500).send({ succes: false, error });
  }
};

const deleteCompetenciaHabilidadController = async (req, res) => {
  /*
  Lo primero que debemos hacer es verificar si la habilidad existe en la base de datos,

  Despues de esto verificamos si la habilidad tiene preguntas asociadas, si tiene preguntas
  asociadas, las eliminamos.

  Por ultimo eliminamos la habilidad.
  */

  try {
    const existHabilidad = await validarHabilidad(
      req.params.id_competencia_habilidad
    );

    if (!existHabilidad) {
      return res
        .status(404)
        .send({ succes: false, message: "Habilidad no encontrada" });
    }

    const preguntas = await preguntaHabilidadServ.getHabilidadPreguntasService(
      req.params.id_competencia_habilidad
    );

    if (preguntas.length > 0) {
      preguntas.forEach(async (pregunta) => {
        await preguntaHabilidadServ.deleteHabilidadPreguntaService(
          pregunta.id_competencia_habilidad_pregunta
        );
      });
    }

    const result =
      await competenciaHabilidadesServ.deleteCompetenciaHabilidadService(
        req.params.id_competencia_habilidad
      );

    if (!result)
      return res
        .status(400)
        .send({ succes: false, message: "No se pudo eliminar la habilidad" });

    return res.send({ succes: true, message: "Habilidad eliminada" });
  } catch (error) {
    return res.status(500).send({ succes: false, error });
  }
};

module.exports = {
  getCompetenciaHabilidadesController,
  getCompetenciaHabilidadByIdController,
  getCompetenciaHabilidadesByCompetenciaController,
  postCompetenciaHabilidadController,
  deleteCompetenciaHabilidadController,
  putCompetenciaHabilidadController,
};
