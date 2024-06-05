const evaluacionesCompetenciasServ = require("../services/evaluaciones.competencias.services");

const getEvaluacionesCompetenciasController = async (req, res) => {
  try {
    const result =
      await evaluacionesCompetenciasServ.selectEvaluacionesCompetenciasService();

    return res.status(200).json({
      message: "Consulta exitosa.",
      data: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error en el servidor.",
    });
  }
};

const getEvaluacionCompetenciasController = async (req, res) => {
  try {
    const { idEvaluacionCompetencias } = req.params;
    const result =
      await evaluacionesCompetenciasServ.selectEvaluacionCompetenciasService(
        idEvaluacionCompetencias
      );

    if (result.length === 0) {
      return res.status(404).json({
        message: "No se encontro la evaluacion.",
        data: result,
      });
    }

    return res.status(200).json({
      message: "Consulta exitosa.",
      data: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error en el servidor.",
    });
  }
};

const postEvaluacionCompetenciasController = async (req, res) => {
  try {
    const newEvaluacionCompetencias = req.body;
    const result =
      await evaluacionesCompetenciasServ.insertEvaluacionCompetenciasService(
        newEvaluacionCompetencias
      );

    return res.status(201).json({
      message: "Registro exitoso.",
      data: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error en el servidor.",
    });
  }
};

const putEvaluacionCompetenciasController = async (req, res) => {
  try {
    const { idEvaluacionCompetencias } = req.params;
    const values = req.body;

    const findEvaluacionCompetencias =
      await evaluacionesCompetenciasServ.selectEvaluacionCompetenciasService(
        idEvaluacionCompetencias
      );

    if (findEvaluacionCompetencias.length === 0) {
      return res.status(404).json({
        message: "No se ha encontrado la evaluacion.",
        data: findEvaluacionCompetencias,
      });
    }

    const result =
      await evaluacionesCompetenciasServ.updateEvaluacionCompetenciasService(
        idEvaluacionCompetencias,
        values
      );

    return res.status(200).json({
      message: "Actualización exitosa.",
      data: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error en el servidor.",
    });
  }
};

const deleteEvaluacionCompetenciasController = async (req, res) => {
  try {
    const { idEvaluacionCompetencias } = req.params;

    const findEvaluacionCompetencias =
      await evaluacionesCompetenciasServ.selectEvaluacionCompetenciasService(
        idEvaluacionCompetencias
      );

    if (findEvaluacionCompetencias.length === 0) {
      return res.status(404).json({
        message: "No se ha encontrado la evaluacion.",
        data: findEvaluacionCompetencias,
      });
    }

    const result =
      await evaluacionesCompetenciasServ.deleteEvaluacionCompetenciasService(
        idEvaluacionCompetencias
      );

    return res.status(200).json({
      message: "Eliminación exitosa.",
      data: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error en el servidor.",
    });
  }
};

const getEvaluacionesCompetenciasByEmpleadoController = async (req, res) => {
  try {
    const { idEmpleado } = req.params;

    // Primero deberia validadr si existe el empleado OJO

    const result =
      await evaluacionesCompetenciasServ.selectEvaluacionCompetenciasByEmpleadoService(
        idEmpleado
      );

    if (!result) {
      return res.status(404).json({
        message: "No se encontraron datos.",
        data: result,
      });
    }

    return res.status(200).json({
      message: "Consulta exitosa.",
      data: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error en el servidor.",
    });
  }
};

module.exports = {
  getEvaluacionesCompetenciasController,
  getEvaluacionCompetenciasController,
  postEvaluacionCompetenciasController,
  putEvaluacionCompetenciasController,
  deleteEvaluacionCompetenciasController,
  getEvaluacionesCompetenciasByEmpleadoController,
};
