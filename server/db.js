const knex =  require("knex");
const config = require("./config")

const DB_Config = config.DB_Config;

const db = knex({
  client: "mysql2",
  connection: {
    host: DB_Config.TALENT_HUB_SERVER,
    user: DB_Config.TALENT_HUB_USER,
    password: DB_Config.TALENT_HUB_PASSWORD,
    database: DB_Config.TALENT_HUB_DB,
  },
});

module.exports = db;