const competenciasPorPuestoService = require('../services/competenciasPuestosService');

async function obtenerCompetenciasPorPuesto(req, res) {
  if (!req.params.id_perfil_puesto) {
    return res
      .status(400)
      .json({
        message:
          'Id_Puesto y ID_Competencia Habilidad son requeridos',
      });
  }

  try {
    const result = await competenciasPorPuestoService.competenciasPorPuesto(
      req.params.id_perfil_puesto
    );
    res.json(result);
    return result;
  } catch (err) {
    res.status(500).send({ message: 'Error al obtener competencias ' });
  }
}


async function agregarCompetenciaAPuesto(req, res) {
  const { id_perfil_puesto, competencias } = req.body;
  if (!id_perfil_puesto || !competencias) {
    return res
      .status(400)
      .json({
        message:
          'Id_Puesto y ID_Competencia Habilidad son requeridos',
      });
  }

  try {

    const result = await competenciasPorPuestoService.agregarCompetenciaAPuesto(
      id_perfil_puesto,
      competencias
    );
    res.status(201).json({ message: 'Competencia agregada exitosamente', result});
  } catch (err) {
    console.error('Error agregando la competencia al puesto: ', err);
    res
      .status(500)
      .json({
        message: 'Error agregando la competencia al puesto',
        error: err.message,
      });
  }
}

async function deleteCompetenciaAPuesto(req, res) {
  const { id_perfil_puesto, id_competencia } = req.body;
  if (!id_perfil_puesto || !id_competencia) {
    return res
      .status(400)
      .json({
        message:
          'Id_Puesto y ID_Competencia Habilidad son requeridos',
      });
  }

  try {

    const result = await competenciasPorPuestoService.deleteCompetenciaPuesto(
      id_perfil_puesto,
      id_competencia
    );
    res.status(201).json({ message: 'Competencia eliminada exitosamente', result});
  } catch (err) {
    console.error('Error eliminando la competencia al puesto: ', err);
    res
      .status(500)
      .json({
        message: 'Error eliminando la competencia al puesto',
        error: err.message,
      });
  }
}

module.exports = {
  obtenerCompetenciasPorPuesto,
  agregarCompetenciaAPuesto,
  deleteCompetenciaAPuesto,
};
