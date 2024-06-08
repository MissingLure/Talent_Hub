const crypto = require("crypto");
const { async } = require("q");

const {DB_Config} = require("../config.js")
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

async function deleteHabilidadCompetenciaService(id_competencia_habilidad) {
    try {
      
      const result = await knex("competencia_habilidad")
        .where({ id_competencia_habilidad })
        .del();
  
      return result > 0; 
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  


async function deleteEmpleado(employeeID){


}

module.exports = {
    deleteHabilidadCompetenciaService
}