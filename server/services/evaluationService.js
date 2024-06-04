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

exports.createEvalucionDesempeno = async (idEvaluacionDesempeno, idEmpleado,Resultado) => {
    try {
        cconst [evalucionId] = await knex('evaluacion_desempeño').insert({
            id_evaluacion_desempeño: idEvaluacionDesempeno,
            id_empleado: idEmpleado,
            resultado: Resultado,
            Fecha: fecha || new Date()
        });
        return evaluacionId;
    } catch (error) {
        res.status(500).send({ message: 'Error al crear la entrevista', error: error.message });
    }
};

//depende de user loggeado
exports.GetEvaluacionesDesmpenoById = async (IdEmpEvaluado) =>{
    try {
        const evalucionDesempeno = await knex.select('resultado')
            .from('evaluacion_desempeño')
            .whereIn('id_empleado', IdEmpEvaluado);
        return evalucionDesempeno;
    } catch (error) {
        console.error('Error al obtener preguntas de la entrevista:', error);
        throw error;
    }
};

exports.CalcularResultado = async(idEmpleado) =>{
    try {
        const lastYear = new Date().getFullYear() - 1;
        const goalData = await knex
        .select('me.peso', 'mer.meta_hecho')
    .from('metas_empleado as me')
    .join('metas_empleado_resultado as mer', 'me.id_meta', '=', 'mer.id_meta')
    .join('metas_jefe_resultado as mjr', 'mer.id_metas_empleado_resultado', '=', 'mjr.id_metas_empleado_resultado')
    .where('me.id_empleado', idEmpleado)
    .andWhere(knex.raw('YEAR(me.año) = ?', [lastYear]));
  
      // Sumatoria
      for (const row of goalData) {
        const score = row.peso * row.meta_hecho;
        puntajeTotal += score;
      }

      
      const evaluacion = await knex('evaluacion_desempeño')
      .where('id_empleado', id)
      .orderBy('Fecha')
      .first();

    // Update 
    if (evaluacion) {
      await knex('evaluacion_desempeño').update({
        resultado: score,
      }).where('id_evaluacion_desempeño', evaluacion.id_evaluacion_desempeño);
    } 
      return puntajeTotal;
    } catch (error) {
        res.status(500).send({ message: 'Error al crear la entrevista', error: error.message });
    }
};



module.exports ={
    GetEvaluacionesDesmpenoById,
    createEvalucionDesempeno,
    CalcularResultado,
    updateResultadoEvaluacion
}