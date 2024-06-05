const gridBoxServ = require("../services/gridBoxService");

async function borrarEmpleadoHandler(req, res) {
  const { id_empleado } = req.params;

  try {
    const rowsDeleted = await gridBoxServ.borrarEmpleado_porID(id_empleado);

    if (rowsDeleted > 0) {
      res
        .status(200)
        .json({
          message: `Empleado GridBox con id ${id_empleado} borrado exitosamente.`,
        });
    } else {
      res
        .status(404)
        .json({
          message: `Empleado GridBox con id ${id_empleado} no encontrado.`,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al borrar empleado: ", error: error.message });
  }
}

async function agregarGridBoxHandler(req, res) {
  const {
    id_empleado,
    descripcion,
    coorx,
    coory,
    resultado_evaluacion_potencial,
    resultado_evaluacion_competencias,
    resultado_evaluacion_desempeño,
  } = req.body;

  const newGridBox = {
    id_empleado,
    descripcion,
    coorx,
    coory,
    resultado_evaluacion_potencial,
    resultado_evaluacion_competencias,
    resultado_evaluacion_desempeño,
  };

  try {
    await gridBoxServ.agregarGridBox(newGridBox);
    res
      .status(201)
      .json({ message: "Grid box agregdo exitosamente.", gridBox: newGridBox });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al agregar GridBox.", error: error.message });
  }
}

async function obtenerAllGridBoxesHandler(req, res) {
  try {
    const gridBoxes = await gridBoxServ.obtenerAllGridBoxes();
    res.status(200).json(gridBoxes);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener las GridBoxes: ",
        error: error.message,
      });
  }
}

async function obtenerGridBox_porID_Handler(req, res) {
  const { id_empleado } = req.params;

  try {
    const gridBox = await gridBoxServ.obtenerGridBox_porID(id_empleado);

    if (gridBox) {
      res.status(200).json(gridBox);
    } else {
      res
        .status(404)
        .json({
          message: `Empleado GridBox con id ${id_empleado} no encontrado.`,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener GridBox: ", error: error.message });
  }
}

async function updateGridBoxHandler(req, res) {
  const { id_empleado } = req.params;
  const updates = req.body;

  try {
    const rowsUpdated = await gridBoxServ.updateGridBox(id_empleado, updates);

    if (rowsUpdated > 0) {
      res
        .status(200)
        .json({
          message: `GridBox con id ${id_empleado} actualizado exitosamente.`,
        });
    } else {
      res
        .status(404)
        .json({ message: `GridBox con id ${id_empleado} no encontrado.` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar GridBox: ", error: error.message });
  }
}

module.exports = {
  borrarEmpleadoHandler,
  agregarGridBoxHandler,
  obtenerAllGridBoxesHandler,
  obtenerGridBox_porID_Handler,
  updateGridBoxHandler,
};
