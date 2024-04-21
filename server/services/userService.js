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

async function getUserByEmail(email) {
    let user = await knex.select('*').from('usuarios').where('correo', email);
    [user] = JSON.parse(JSON.stringify(user));
    return user;
}

async function getEmployeeById(id) {
    let employee = await knex.select('*').from('empleados').where('id_empleado', id);
    [employee] = JSON.parse(JSON.stringify(employee));
    return employee; 
}

async function getUserById(employeeId) {
    let user = await knex.select('id_usuario', 'id_empleado', 'correo', 'rol').from('usuarios').where('id_empleado', employeeId);
    [user] = JSON.parse(JSON.stringify(user));
    return user;
}

module.exports = {
    getUserByEmail,
    getEmployeeById,
    getUserById,
};