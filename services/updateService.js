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

async function asignarJefe(employeeId, bossId) {
    try {
        console.log(employeeId, bossId);
        const result = await knex('empleados')
        .where('id_empleado', employeeId)
        .update({ id_jefe: bossId });
        console.log(result);
        return result;
    } catch(error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    asignarJefe,
};