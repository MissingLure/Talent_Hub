const db = require("../db");

const getDashboardService = async () => {
  try {
    const result = await db.select().table("empleados");
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getEmpleadoService = async (id_empleado) => {
  try {
    const result = await db("empleados").where({ "empleados.id_empleado": id_empleado })
    .join(
      "departamentos",
      "empleados.id_departamento",
      "departamentos.id_departamento",
    )
    .join(
      "perfiles_puestos", 
      "empleados.id_perfil_puesto",
      "perfiles_puestos.id_perfil_puesto",
    )
    /*.join(
      "paises", 
      "empleados.id_pais",
      "paises.id_pais",
    )*/
    .select()
    ;
    return result;
  } catch (error){
    console.log(error);
    return null;
  }
};

const getResultadosEvaService = async (id_empleado) => {
  try {
    const result = await db("9_grid_box").where({ id_empleado })
    .select()
    ;
    return result;
  } catch (error){
    console.log(error);
    return null;
  }
}


module.exports = {
  getDashboardService,
  getEmpleadoService,
  getResultadosEvaService,

};