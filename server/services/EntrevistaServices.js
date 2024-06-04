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

// Método para crear una entrevista
exports.createEntrevistaHabilidad = async (idEntrevistasCompetencia, idCompetenciaHabilidad) => {
    try {
        const [entrevistaId] = await knex('entrevistas_competencia_habilidad').insert({
            id_entrevista_competencia: idEntrevistasCompetencia,
            id_competencia_habilidad: idCompetenciaHabilidad
        });
        return entrevistaId;
    } catch (error) {
        console.error('Error al crear la entrevista:', error);
        throw error;
    }
};

// Método para obtener preguntas de una entrevista específica
exports.getPreguntasEntrevistaHabilidad = async (idEntrevista) => {
    try {
        const preguntas = await knex.select('pregunta_habilidad')
            .from('competencia_habilidad')
            .whereIn('id_competencia', function() {
                this.select('id_competencia')
                    .from('entrevistas_competencia')
                    .where('id_entrevistas_competencia', idEntrevista);
            });
        return preguntas;
    } catch (error) {
        console.error('Error al obtener preguntas de la entrevista:', error);
        throw error;
    }
};

exports.createEntrevistaPotencial = async (idEntrevistasPotencial, idCompetenciaPotencial) => {
    try {
        const [entrevistaId] = await knex('entrevistas_competencia_potencial').insert({
            id_entrevista_potencial: idEntrevistasPotencial,
            id_competencia_potencial: idCompetenciaPotencial
        });
        return entrevistaId;
    } catch (error) {
        console.error('Error al crear la entrevista:', error);
        throw error;
    }
};


// Método para obtener preguntas de una entrevista específica
exports.getPreguntasEntrevistaPotencial = async (idEntrevista) => {
    try {
        const preguntas = await knex.select('pregunta_potencial')
            .from('competencia_potencial')
            .whereIn('id_competencia', function() {
                this.select('id_competencia')
                    .from('entrevistas_potencial')
                    .where('id_entrevistas_potencial', idEntrevista);
            });
        return preguntas;
    } catch (error) {
        console.error('Error al obtener preguntas de la entrevista:', error);
        throw error;
    }
};

module.exports = {
    createEntrevistaPotencial,
    createEntrevistaHabilidad,
    getPreguntasEntrevistaPotencial,
    getPreguntasEntrevistaHabilidad
};
