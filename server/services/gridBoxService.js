const db = require("../db");

async function borrarEmpleado_porID(id_empleado) {
    const result = await db('9_grid_box')
      .where({ id_empleado })
      .del();
    return result;
}

async function agregarGridBox(gridBox) {
    const result = await db('9_grid_box').insert(gridBox);
    return result;
}

async function obtenerAllGridBoxes() {
    const result = await db('9_grid_box').select('*');
    return result;
}


async function obtenerGridBox_porID(id_empleado) {
    const result = await db('9_grid_box')
      .where({ id_empleado })
      .first();
    return result;
}

async function updateGridBox(id_empleado, updates) {
    const result = await db('9_grid_box').where({ id_empleado }).update(updates);
    return result;
}

module.exports = {

    borrarEmpleado_porID,
    agregarGridBox,
    obtenerAllGridBoxes,
    obtenerGridBox_porID,
    updateGridBox

};