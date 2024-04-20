const crypto = require("crypto");
const { async } = require("q");
const knex = require("knex")({
    client: 'mssql',
    connection: {
        server: process.env.TALENT_HUB_SERVER,
        user: process.env.TALENT_HUB_USER,
        password: process.env.TALENT_HUB_PASSWORD,
        database: process.env.TALENT_HUB_DB,
        options: process.env.TALENT_HUB_PORT,
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