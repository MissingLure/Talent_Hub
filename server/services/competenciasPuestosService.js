const db = require('../db');

async function competenciasPorPuesto(id_perfil_puesto) {
  if (!id_perfil_puesto) {
    throw new Error('id_perfil_puesto is required');
  }

  try {
    const result = await db('perfiles_puestos')
      .join(
        'perfiles_puestos_habilidad',
        'perfiles_puestos.id_perfil_puesto',
        'perfiles_puestos_habilidad.id_perfil_puesto'
      )
      .join(
        'competencias',
        'perfiles_puestos_habilidad.id_competencia',
        'competencias.id_competencia'
      )
      .where('perfiles_puestos.id_perfil_puesto', id_perfil_puesto)
      .select(
        'perfiles_puestos.*',
        'perfiles_puestos_habilidad.*',
        'competencias.*'
      );
      console.log(result);
    return result;

  } catch (err) {
    console.error('Error obteniendo las competencias por puesto: ', err);
    throw err;
  }
}

async function agregarCompetenciaAPuesto(id_perfil_puesto, id_competencia) {
  if (!id_perfil_puesto || !id_competencia) {
    throw new Error('ID Puesto y ID Competencia son requeridos');
  }

  try {
    const [result] = await db('perfiles_puestos_habilidad')
      .insert({
        id_perfil_puesto: id_perfil_puesto,
        id_competencia: id_competencia,
      })
      .returning('*');

    return result;
  } catch (err) {
    console.error('Error agregando la competencia: ', err);
    throw new Error(`Error agregando la competencia: ${err.message}`);
  }
}

async function deleteCompetenciaPuesto(id_perfil_puesto, id_competencia) {
  try {
    
    const result = await db("perfiles_puestos_habilidad")
      .where({id_perfil_puesto: id_perfil_puesto,
        id_competencia: id_competencia, })
      .del();

    return result; 
  } catch (error) {
    console.log(error);
    return false;
  }
}




module.exports = {
  competenciasPorPuesto,
  agregarCompetenciaAPuesto,
  deleteCompetenciaPuesto,
};
