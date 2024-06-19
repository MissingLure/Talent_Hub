const metaEmpleadoResultadoService = require("../services/metaEmpleadoResultadoService");

async function obtenerMetasEmpleadoResultado(req, res) {
  try {
    const resultados = await metaEmpleadoResultadoService.obtenerTodos();
    res.json(resultados);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener los resultados" });
  }
}

async function obtenerMetasPorEmpleado(req, res) {
  const { id_empleado } = req.params;
  try {
      const metas = await metaEmpleadoResultadoService.obtenerById(id_empleado);
      if (metas) {
          res.json(metas);
      } else {
          res.status(404).json({ success: false, message: 'No se encontraron metas para el empleado con el ID proporcionado.' });
      }
  } catch (error) {
      console.error('Error al obtener metas por empleado:', error);
      res.status(500).json({ success: false, message: 'Ocurrió un error al obtener metas por empleado.' });
  }
}

async function insertarMetaEmpleadoResultado(req, res) {
  try {
    const nuevoResultado = await metaEmpleadoResultadoService.insertar(
      req.body
    );
    res.status(201).json(nuevoResultado);
  } catch (error) {
    res.status(500).send({ message: "Error al insertar el resultado" });
  }
}

async function actualizarMetaEmpleadoResultado(req, res) {
  try {
    const actualizado = await metaEmpleadoResultadoService.actualizar(
      req.params.id_metas_empleado_resultado,
      req.body
    );
    res.json(actualizado);
  } catch (error) {
    res.status(500).send({ message: "Error al actualizar el resultado" });
  }
}

async function eliminarMetaEmpleadoResultado(req, res) {
  try {
    await metaEmpleadoResultadoService.eliminar(
      req.params.id_metas_empleado_resultado
    );
    res.send({ message: "Resultado eliminado correctamente" });
  } catch (error) {
    res.status(500).send({ message: "Error al eliminar el resultado" });
  }
}

module.exports = {
  obtenerMetasEmpleadoResultado,
  insertarMetaEmpleadoResultado,
  actualizarMetaEmpleadoResultado,
  eliminarMetaEmpleadoResultado,
  obtenerMetasPorEmpleado,
};
