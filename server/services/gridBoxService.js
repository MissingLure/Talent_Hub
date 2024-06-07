const { DB_Config } = require("../config.js");

const knex = require("knex")({
    client: "mysql2",
    connection: {
      host: DB_Config.TALENT_HUB_SERVER,
      port: DB_Config.TALENT_HUB_PORT,
      user: DB_Config.TALENT_HUB_USER,
      password: DB_Config.TALENT_HUB_PASSWORD,
      database: DB_Config.TALENT_HUB_DB,
    },
  });
  
async function borrarEmpleado_porID(id_empleado) {
    const result = await knex('9_grid_box')
      .where({ id_empleado })
      .del();
    return result;
}

async function agregarGridBox(gridBox) {
    const result = await knex('9_grid_box').insert(gridBox);
    return result;
}

async function obtenerAllGridBoxes() {
    const result = await knex('9_grid_box').select('*');
    return result;
}


async function obtenerGridBox_porID(id_empleado) {
    const result = await knex('9_grid_box')
      .where({ id_empleado })
      .first();
    return result;
}

async function updateGridBox(req, res) {
  const result = await knex('9_grid_box').where({ id_empleado }).update(updates);
  return result;
}

module.exports = {

    borrarEmpleado_porID,
    agregarGridBox,
    obtenerAllGridBoxes,
    obtenerGridBox_porID,
    updateGridBox

};