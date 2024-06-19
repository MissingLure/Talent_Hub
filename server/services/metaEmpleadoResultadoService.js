const { DB_Config } = require('../config.js');
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: DB_Config.TALENT_HUB_SERVER,
    port: DB_Config.TALENT_HUB_PORT,
    user: DB_Config.TALENT_HUB_USER,
    password: DB_Config.TALENT_HUB_PASSWORD,
    database: DB_Config.TALENT_HUB_DB,
  },
});

async function obtenerTodos() {
  try {
    const resultados = await knex('metas_empleado_resultado')
      .select('metas_empleado_resultado.*', 'metas_empleado.*')
      .join(
        'metas_empleado',
        'metas_empleado_resultado.id_meta',
        '=',
        'metas_empleado.id_meta'
      );
    return resultados;
  } catch (error) {
    console.log('Error obteniendo todos los resultados:', error);
    return false;
  }
}

async function obtenerById(id_empleado) {
  try {
    const resultados = await knex('metas_empleado_resultado')
      .select('metas_empleado_resultado.*', 'metas_empleado.*')
      .join(
        'metas_empleado',
        'metas_empleado_resultado.id_meta',
        '=',
        'metas_empleado.id_meta'
      )
      .where('metas_empleado.id_empleado', id_empleado);
    return resultados;
  } catch (err) {
    console.log('Error al obtener metas por empleado: ', err);
    return false;
  }
}

async function insertar(data) {
  try {
    const {
      id_meta,
      meta_titulo,
      meta_descripcion,
      meta_hecho,
      meta_creadoEl,
    } = data;
    const [id] = await knex('metas_empleado_resultado')
      .insert({
        id_meta,
        meta_titulo,
        meta_descripcion,
        meta_hecho,
        meta_creadoEl,
      })
      .returning('id_metas_empleado_resultado');
    return { id_metas_empleado_resultado: id, ...data };
  } catch (error) {
    console.log('Error insertando el resultado:', error);
    return false;
  }
}

async function actualizar(id, data) {
  try {
    const { meta_titulo, meta_descripcion, meta_hecho, meta_creadoEl } = data;
    await knex('metas_empleado_resultado')
      .where({ id_metas_empleado_resultado: id })
      .update({
        meta_titulo,
        meta_descripcion,
        meta_hecho,
        meta_creadoEl,
      });
    return { id, ...data };
  } catch (error) {
    console.log('Error actualizando el resultado:', error);
    return false;
  }
}

async function eliminar(id) {
  try {
    await knex('metas_empleado_resultado')
      .where({ id_metas_empleado_resultado: id })
      .del();
    return { message: 'Registro eliminado correctamente' };
  } catch (error) {
    console.log('Error eliminando el resultado:', error);
    return false;
  }
}

module.exports = {
  obtenerTodos,
  insertar,
  actualizar,
  eliminar,
  obtenerById,
};
