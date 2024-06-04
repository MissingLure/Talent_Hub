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
    const result = await db("empleados").where({ id_empleado }).select();
    return result;
  } catch (error){
    console.log(error);
    return null;
  }
};

const getDepartamentoService = async (id_empleado) => {
  try {
    const result = await db("empleados")
      .join(
        "departamentos",
        "empleados.id_departamento",
        "departamentos.id_departamento"
      )
      .where({ id_empleado })
      .select(
        "departamentos.nombre_departamento",
      );
    
    return result;
  } catch (error){
    console.log(error);
    return null;
  }
};

const getPuestoService = async (id_empleado) => {
  try {
    const result = await db("empleados")
      .join(
        "perfiles_puestos",
        "empleados.id_perfil_puesto",
        "perfiles_puestos.id_perfil_puesto"
      )
      .where({ id_empleado })
      .select(
        "perfiles_puestos.nombre_perfil",
      );
    
    return result;
  } catch (error){
    console.log(error);
    return null;
  }
};

module.exports = {
  getPuestoService,
  getDepartamentoService,
  getDashboardService,
  getEmpleadoService

};