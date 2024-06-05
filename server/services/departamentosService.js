const db = require("../db");

async function obtenerAllDepartamentos() {
    const result = await db('departamentos').select('*');
    return result;
  }
  
  async function obtenerDepartamento_porId(id_departamento) {
    const result = await db('departamentos').where({ id_departamento }).first();
    return result;
  }
  
  async function agregarDepartamento(departamento) {
    const result = await db('departamentos').insert(departamento);
    return result;
  }
  
  async function updateDepartamento(id_departamento, updates) {
    const result = await db('departamentos').where({ id_departamento }).update(updates);
    return result;
  }
  
  async function borrarDepartamento_porID(id_departamento) {
    const result = await db('departamentos').where({ id_departamento }).del();
    return result;
  }


module.exports = {

obtenerAllDepartamentos,
obtenerDepartamento_porId,
agregarDepartamento,
updateDepartamento,
borrarDepartamento_porID

};