const competenciasServ = require("../services/competencias.services");

const validarCompetencia = async (id_competencia) => {
  const competencia = await competenciasServ.getCompetenciaService(
    id_competencia
  );

  if (competencia.length === 0) {
    return false;
  }
  return true;
};

const getCompetenciasController = async (req, res) => {
  try {
    const result = await competenciasServ.getCompetenciasService();

    return res.send({ succes: true, data: result });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const getCompetenciaByIdController = async (req, res) => {
  try {
    const result = await competenciasServ.getCompetenciaService(
      req.params.id_competencia
    );

    if (result.length == 0) {
      return res
        .status(400)
        .send({ succes: false, message: "Compentecia no encontrada" });
    }

    return res.send({ succes: true, data: result[0] });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const postCompetenciaController = async (req, res) => {
  try {
    const newcompetencia = req.body;

    const result = await competenciasServ.insertCompetenciaService(
      newcompetencia
    );

    if (result)
      res.send({ succes: true, message: "Competencia creada", result });
  } catch (error) {
    return res.status(500).send({ succes: false, error });
  }
};

const putCompetenciaController = async (req, res) => {
  try {
    const result = await competenciasServ.updateCompetenciaService(
      req.params.id_competencia,
      req.body
    );

    if (result === 0)
      return res.status(400).send({
        succes: false,
        message: "No se pudo actualizar la competencia",
      });

    return res.send({ succes: true, message: "Competencia Actualizada" });
  } catch (error) {
    return res.status(500).send({ succes: false, error });
  }
};

const deleteCompetenciaController = async (req, res) => {
  try {
    const result = await competenciasServ.deleteCompetenciaService(
      req.params.id_competencia
    );

    if (result === 0)
      return res.status(400).send({
        succes: false,
        message: "Competencia no encontrada",
        result,
      });

    return res.send({ succes: true, message: "Competencia eliminada" });
  } catch (error) {
    return res.status(500).send({ succes: false, error });
  }
};

module.exports = {
  getCompetenciasController,
  getCompetenciaByIdController,
  postCompetenciaController,
  deleteCompetenciaController,
  putCompetenciaController,
  validarCompetencia,
};
