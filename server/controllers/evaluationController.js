const EvaluacionService = require("../services/evaluationService");

exports.createEvalucionDesempeno = async (req, res) => {
  try {
    const { idEvaluacionDesempeno, idEmpleado } = req.body;
    const evaluacion = await EvaluacionService.createEvalucionDesempeno(
      idEvaluacionDesempeno,
      idEmpleado,
      null
    );
    res
      .status(201)
      .send({ message: "evaluacion creada con éxito", evaluacion });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al crear la evaluacion", error: error.message });
  }
};

exports.GetEvaluacionesDesmpenoById = async (req, res) => {
  try {
    const { idEmpleado } = req.params;
    const eval = await EvaluacionService.GetEvaluacionesDesmpenoById(
      idEmpleado
    );
    if (eval.length > 0) {
      res.status(200).send(eval);
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

exports.updateResultadoEvaluacion = async (req, res) => {
  try {
    const { idEmpleado } = req.params;
    const eval = await EvaluacionService.CalcularResultado(idEmpleado);
    await EvaluacionService.updateResultadoEvaluacion(eval);
    res.status(201).send({ message: "resultado obtenido con éxito" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al obtener el resultado", error: error.message });
  }
};
