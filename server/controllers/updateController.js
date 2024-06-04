const { response, request } = require("express");
const {
  asignarJefe,
  actualizarEmpleado,
} = require("../services/updateService");
const { emptyFields } = require("../utils/validator");
const { ids } = require("webpack");

async function asignar_jefe(request, response) {
  try {
    const { employeeId, bossId } = request.body;

    const data = {
      employeeId: employeeId,
      bossId: bossId,
    };
    console.log(data);
    const result = await asignarJefe(employeeId, bossId);
    console.log(result);
    response.send(result);
  } catch (error) {
    response.status(500).send({
      success: false,
      details: "Error al tratar de actualizar datos.",
    });
    console.log("ERROR DE SERVIDOR.");
  }
}

async function actualizarUsuario(req, res) {
  try {
  } catch (error) {
    res
      .status(500)
      .send({ success: false, details: "Error al actualizar usuario" });
  }
}

async function actualizar_Empleado(req, res) {
  try {
    const { employeeID } = req.params;

    const { telefono, IDPerfil, IDDepartamento, IDJefe } = req.body;

    const data = {
      telefono: telefono,
      IDPerfil: IDPerfil,
      IDDepartamento: IDDepartamento,
      IDJefe: IDJefe,
    };

    const result = await actualizarEmpleado(
      employeeID,
      telefono,
      IDPerfil,
      IDDepartamento,
      IDJefe
    );

    console.log(data);
    if (!result) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.json(result);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, details: "Error al actualizar usuario" });
    console.log(error.message);
  }
}

module.exports = {
  asignar_jefe,
  actualizar_Empleado,
  actualizarUsuario,
};
