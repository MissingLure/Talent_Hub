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

async function actualizarEmpleado(employeeID,Telefono, IDPerfil, IDDepartamento, IDJefe){
    try{
      
        console.log(employeeID, Telefono, IDPerfil, IDDepartamento, IDJefe)
        const result = await knex('empleados').where('id_empleado', employeeID).update({id_perfil_puesto: IDPerfil, telefono: Telefono, id_departamento: IDDepartamento, id_jefe: IDJefe});
        console.log (result)
        return result;

    }catch(error){
        console.log(error);
        return false
    }
}

async function actualizarUsuario(employeeID){
    try{

    }catch(error){
        console.log(error);
        return false
    }
}

module.exports = {
    asignarJefe,
    actualizarEmpleado,
    actualizarUsuario
};