const { DB_Config } = require("../config.js");
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

async function insertarPais (req, res) {
    try {
        const{idPais, nombre}=req.body;
        const [id] = await knex('paises').insert({
            nombre,
        });
        res.status(201).json({ id });
    } catch (error) {
        console.error('Error al crear la entrevista:', error);
        res.status(500).json({ error: 'Fallo al insertar pais' });
    }
};

async function GetAllPais () {
    try {
        const result = await knex('paises').select('*');
        return result;
      } catch (err) {
        console.log('Error obteniendo todos los paises: ', err);
      }
};

module.exports = {
 insertarPais,
 GetAllPais,
};