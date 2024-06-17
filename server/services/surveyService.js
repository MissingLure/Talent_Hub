const crypto = require("crypto");
const { async } = require("q");

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


async function getSurveysByJobProfile (jobProfileId) {
  try {
    let survey = await knex.select("*").from("entrevistas_compentecia_habilidad").where("id_perfil_puesto", jobProfileId);
    console.log(survey);

    return survey;

  } catch (error) {
    throw new Error('Error fetching surveys');
  }
};

module.exports = {
  getSurveysByJobProfile
};