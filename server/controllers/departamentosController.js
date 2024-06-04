const departamentosServ = require("../services/departamentosService");

async function obtenerAllDepartamentosHandler(req, res) {
  try {
    const departamentos = await departamentosServ.obtenerAllDepartamentos();
    res.status(200).json(departamentos);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener departamentos: ",
        error: error.message,
      });
  }
}

async function obtenerDepartamento_porIDHandler(req, res) {
  const { id_departamento } = req.params;

  try {
    const departamento = await departamentosServ.obtenerDepartamento_porId(
      id_departamento
    );

    if (departamento) {
      res.status(200).json(departamento);
    } else {
      res
        .status(404)
        .json({
          message: `Departamento con id ${id_departamento} no encontrado.`,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erro al obtener departamento: ",
        error: error.message,
      });
  }
}

async function agregarDepartamentoHandler(req, res) {
  const { id_departamento, nombre_departamento, id_jefe, numero_empleados } =
    req.body;

  const newDepartamento = {
    id_departamento,
    nombre_departamento,
    id_jefe,
    numero_empleados,
  };

  try {
    await departamentosServ.agregarDepartamento(newDepartamento);
    res
      .status(201)
      .json({
        message: "Departamento agregado exitosamente.",
        departamento: newDepartamento,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al agregar departamento: ",
        error: error.message,
      });
  }
}

async function updateDepartamentoHandler(req, res) {
  const { id_departamento } = req.params;
  const updates = req.body;

  try {
    const rowsUpdated = await departamentosServ.updateDepartamento(
      id_departamento,
      updates
    );

    if (rowsUpdated > 0) {
      res
        .status(200)
        .json({
          message: `Departamento con id ${id_departamento} actualizado exitosamente.`,
        });
    } else {
      res
        .status(404)
        .json({
          message: `Departamento con id ${id_departamento} no encontrado.`,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar departamentos: ",
        error: error.message,
      });
  }
}

async function borrarDepartamentoHandler(req, res) {
  const { id_departamento } = req.params;

  try {
    const rowsDeleted = await departamentosServ.borrarDepartamento_porID(
      id_departamento
    );

    if (rowsDeleted > 0) {
      res
        .status(200)
        .json({
          message: `Departamento con id ${id_departamento} borrado exitosamente.`,
        });
    } else {
      res
        .status(404)
        .json({
          message: `Departamento con id ${id_departamento} no encontrado.`,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al borrar departamento: ",
        error: error.message,
      });
  }
}

module.exports = {
  obtenerAllDepartamentosHandler,
  obtenerDepartamento_porIDHandler,
  agregarDepartamentoHandler,
  updateDepartamentoHandler,
  borrarDepartamentoHandler,
};
