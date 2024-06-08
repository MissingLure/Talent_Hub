const puestosService = require("../services/puestosService");

async function obtenerPuestos(req, res) {
  try {
    const resultados = await puestosService.obtenerPuestos();
    res.json(resultados);
  } catch (err) {
    res.status(500).send({ message: "Error al obtener los resultados" });
  }
}

async function insertarPuesto(req, res) {
  try {
    const nuevoResultado = await puestosService.insertarPuesto(req.body);
    res.status(201).json(nuevoResultado);
  } catch (err) {
    res.status(500).send({ message: "Error al insertar el resultado" });
  }
}

async function actualizarPuesto(req, res) {
  try {
    const actualizado = await puestosService.actualizarPuesto(
      req.params.id_perfil_puesto,
      req.body
    );
    res.json(actualizado);
  } catch (err) {
    res.status(500).send({ message: "Error al actualizar el puesto " });
  }
}

async function eliminarPuesto(req, res) {
  try {
    await puestosService.eliminarPuesto(req.params.id_perfil_puesto);
    res.send({ message: "Puesto Eliminado " });
  } catch (errr) {
    res.status(500).send({ message: "Error al eliminar el puesto" });
  }
}

module.exports = {
  obtenerPuestos,
  insertarPuesto,
  actualizarPuesto,
  eliminarPuesto,
};
