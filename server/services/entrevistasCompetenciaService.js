const { DB_Config } = require("../config");
const knex = require("knex")({
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
        const resultados = await knex('entrevistas_competencia').select('*');
        return resultados;
    } catch (error) {
        console.log('Error obteniendo todas las entrevistas:', error);
        return false;
    }
}

async function obtenerPorId(id) {
    try {
        const resultado = await knex('entrevistas_competencia').where({ id_entrevistas_competencia: id }).first();
        return resultado;
    } catch (error) {
        console.log('Error obteniendo la entrevista por ID:', error);
        return false;
    }
}

async function obtenerPorPuesto(id) {
    try {
        const resultado = await knex('entrevistas_competencia_habilidad').join('entrevistas_competencia','entrevistas_competencia_habilidad.id_entrevistas_competencia','=','entrevistas_competencia.id_entrevistas_competencia').where({ id_perfil_puesto: id });
        return resultado;
    } catch (error) {
        console.log('Error obteniendo la entrevista por ID:', error);
        return false;
    }
}

async function insertar(data) {
    try {
        const { id_entrevistas_competencia, descripcion, Nombre, Lenguaje, TipoEncuesta } = data;
        const [id] = await knex('entrevistas_competencia').insert({
            id_entrevistas_competencia, descripcion, Nombre, Lenguaje, TipoEncuesta
        }).returning('id_entrevistas_competencia');
        return { id_entrevistas_competencia: id, ...data };
    } catch (error) {
        console.log('Error insertando la entrevista:', error);
        return false;
    }
}

async function actualizar(id, data) {
    try {
        const { descripcion, Nombre, Lenguaje, TipoEncuesta } = data;
        await knex('entrevistas_competencia').where({ id_entrevistas_competencia: id }).update({
            descripcion, Nombre, Lenguaje, TipoEncuesta
        });
        return { id_entrevistas_competencia: id, ...data };
    } catch (error) {
        console.log('Error actualizando la entrevista:', error);
        return false;
    }
}

async function eliminar(id) {
    try {
        await knex('entrevistas_competencia').where({ id_entrevistas_competencia: id }).del();
        return { message: "Entrevista eliminada correctamente" };
    } catch (error) {
        console.log('Error eliminando la entrevista:', error);
        return false;
    }
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    insertar,
    actualizar,
    eliminar,
    obtenerPorPuesto,
};
