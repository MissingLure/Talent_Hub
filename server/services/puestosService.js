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

//CRUD

async function obtenerPuestos() {
  try {
    const result = await knex('perfiles_puestos').select('*');
    return result;
  } catch (err) {
    console.log('Error obteniendo todos los puestos: ', err);
  }
}

async function insertarPuesto(req, res) {
  try {
    const { nombre_perfil, id_departamento, numero_plazas, id_requisito } =
      req.body;
    const [id] = await knex('perfiles_puestos').insert({
      nombre_perfil,
      id_departamento,
      numero_plazas,
      id_requisito,
    });

    res.status(201).json({ id });
  } catch (err) {
    console.log('Error al insertar puesto: ', err);
    res.status(500).json({ error: 'Fallo al insertar puesto' });
  }
}

async function actualizarPuesto(req, res) {
  try {
    const { id } = req.params;
    const { nombre_perfil, id_departamento, numero_plazas, id_requisito } =
      req.body;

    const result = await knex('perfiles_puestos')
      .where({ id })
      .update({ nombre_perfil, id_departamento, numero_plazas, id_requisito });

    if (result) {
      res.status(200).json({ message: 'Puesto actualizado exitosamente' });
    } else {
      res.status(404).json({ error: 'Puesto no encontrado' });
    }
  } catch (err) {
    console.error('Error al actualizar puesto: ', err);
    res.status(500).json({ error: 'Fallo al actualizar puesto' });
  }
}

async function eliminarPuesto(req, res) {
  try {
    const { id } = req.params;

    const result = await knex('perfiles_puestos').where({ id }).del();

    if (result) {
      res.status(200).json({ message: 'Puesto eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Puesto no encontrado' });
    }
  } catch (err) {
    console.error('Error eliminando puesto: ', err);
    res.status(500).json({ error: 'Fallo al eliminar puesto' });
  }
}

module.exports = {
  obtenerPuestos,
  insertarPuesto,
  actualizarPuesto,
  eliminarPuesto,
};
