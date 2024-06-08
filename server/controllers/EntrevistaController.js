const EntrevistaService = require("../services/EntrevistaServices");

// Método para crear una nueva entrevista
exports.createEntrevistaHabilidad = async (req, res) => {
  try {
    const { idEntrevistasCompetencia, idCompetenciaHabilidad } = req.body;
    const entrevistaId = await EntrevistaService.createEntrevistaHabilidad(
      idEntrevistasCompetencia,
      idCompetenciaHabilidad
    );
    res
      .status(201)
      .send({ message: "Entrevista creada con éxito", entrevistaId });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al crear la entrevista", error: error.message });
  }
};

// Método para obtener preguntas de una entrevista específica
exports.getPreguntasEntrevistaHabilidad = async (req, res) => {
  try {
    const { idEntrevistasCompetencia } = req.params;
    const preguntas = await EntrevistaService.getPreguntasEntrevistaHabilidad(
      idEntrevistasCompetencia
    );
    if (preguntas.length > 0) {
      res.status(200).send(preguntas);
    } else {
      res
        .status(404)
        .send({
          message: "No se encontraron preguntas para la entrevista indicada",
        });
    }
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Error al obtener las preguntas",
        error: error.message,
      });
  }
};

exports.createEntrevistaPotencial = async (req, res) => {
  try {
    const { idEntrevistasPotencial, idCompetenciaPotencial } = req.body;
    const entrevistaId = await EntrevistaService.createEntrevistaPotencial(
      idEntrevistasPotencial,
      idCompetenciaPotencial
    );
    res
      .status(201)
      .send({ message: "Entrevista creada con éxito", entrevistaId });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al crear la entrevista", error: error.message });
  }
};

// Método para obtener preguntas de una entrevista específica
exports.getPreguntasEntrevistaPotencial = async (req, res) => {
  try {
    const { idEntrevistasPotencial } = req.params;
    const preguntas = await EntrevistaService.getPreguntasEntrevistaPotencial(
      idEntrevistasPotencial
    );
    if (preguntas.length > 0) {
      res.status(200).send(preguntas);
    } else {
      res
        .status(404)
        .send({
          message: "No se encontraron preguntas para la entrevista indicada",
        });
    }
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Error al obtener las preguntas",
        error: error.message,
      });
  }
};
