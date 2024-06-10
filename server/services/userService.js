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

async function getUserByEmail(email) {
  let user = await knex.select("*").from("usuarios").where("correo", email);
  [user] = JSON.parse(JSON.stringify(user));
  return user;
}

async function getEmployeeById(id) {
  let employee = await knex
    .select("*")
    .from("empleados")
    .where("id_empleado", id);
  [employee] = JSON.parse(JSON.stringify(employee));
  return employee;
}

async function getUserById(employeeId) {
  let user = await knex
    .select("id_usuario", "id_empleado", "correo", "rol")
    .from("usuarios")
    .where("id_empleado", employeeId);
  [user] = JSON.parse(JSON.stringify(user));
  return user;
}


//FUNCION TRANSACTION PARA DELETE EMPLEADO JUNTO CON SU USUARIO (TERMINAR LUEGO DE CAMBIOS EN LA DB)
/*async function deleteEmpleadoById(id) {
  try {
    console.log(id);

    await knex.transaction(async (trx) => {

      await deleteReferences(id, trx);

      await deleteUsuarioAUX(id, trx);

      let deletedEmployee = await trx('empleados')
        .where('id_empleado', id)
        .del();
      console.log(deletedEmployee);

      return deletedEmployee;
    });
  } catch (error) {
    console.error('Error deleting employee and user:', error);
    throw error;
  }
}

//Funcion auxiliar de deleteUsuario para deleteEmployee
async function deleteUsuarioAUX(id, trx) {
  await trx('usuarios')
    .where('id_usuario', id)
    .del();
}

async function deleteReferences(id, trx) {
  await trx('9_grid_box')
    .where('id_empleado', id)
    .del();
*/

async function deleteEmpleadoById(id) {
  try {
    console.log(id);

    let deletedEmployee = await knex.select("*").from("empleados").where("id_empleado",id).del();
    console.log(deletedEmployee);

    return deletedEmployee;

  } catch (error) {
    console.error('Error deleting employee', error);
    throw error;
  }
}

async function deleteUsuarioById (id) {
  try{

    console.log(id);

    let deletedUser = await knex.select("*").from("usuarios").where("id_usuario", id).del();
    console.log(deletedUser);
    return deletedUser;

  } catch (error){
    console.error('Error deleting user:', error);
    throw error;
  }
}

module.exports = {
  getUserByEmail,
  getEmployeeById,
  getUserById,
  deleteEmpleadoById,
  deleteUsuarioById,
};
