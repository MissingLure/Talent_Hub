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

async function obtenerDepartamentos() {
    let departamentos = await knex("departamentos").select();
    if (departamentos) {
        return departamentos;
    } else {
        console.log('No hay departamentos disponibles.');
    }
};

async function obtenerPuestos() {
    let puestos = await knex("perfiles_puestos").select();
    if(puestos) {
        return puestos;
    } else {
        console.log('No hay perfiles de puestos disponibles');
    }
}

async function obtenerEmpleado(idEmpleado) {
    console.log(idEmpleado);
    const empleado = await knex.select('*').from('empleados').where('id_empleado', idEmpleado);
    return empleado;
}

async function getByEmail(correo) {
    let usuario = await knex.select('*').from('usuarios').where('correo', correo);
    return usuario;
}

async function getById(identidad) {
    let usuario = await knex.select('*').from('empleados').where('numero_identidad', identidad);
    return usuario;
}

async function obtenerCompetencias() {
    const competencias = await knex.select('*').from('competencias');
    return competencias;
};

async function obtenerHabilidades() {
    const habilidades = (await knex.select('*').from('habilidades').orderBy('nombre_habilidad'));
    return habilidades;
}

async function obtenerComportamientosPorCompetencia(idComptencia) {
    const comportamientos = await knex.select('*').from('evaluaciones_comportamientos').where('id_competencia', idComptencia);
    return comportamientos;
}

async function obtenerEvaluaciones() {
    const evaluaciones = await knex.select('*').from('evaluaciones');
    return evaluaciones;
}

async function obtenerPreguntas() {
    const preguntasResult = await knex.raw('SELECT p.*, c.nombre_competencia AS nombre_competencia, c.descripcion AS descripcion_competencia FROM evaluaciones_comportamientos p JOIN competencias c ON p.id_competencia = c.id_competencia');
    const competencias = [];
    let comportamientos = [];
    let preguntas = [];
    let id_competencia = 1;
    let nombre_competencia = '';
    for(const pregunta of preguntasResult) {
        if(pregunta.id_competencia === id_competencia) {
            
            nombre_competencia = pregunta.nombre_competencia;
            comportamientos.push(pregunta.comportamiento);
            preguntas.push(pregunta.pregunta);
        } else {
            if(comportamientos.length > 0) {
                competencias.push({id_competencia: id_competencia, nombre_competencia: nombre_competencia, comportamientos: comportamientos, preguntas: preguntas});
            }

            console.log(id_competencia);

            id_competencia++;
            nombre_competencia = pregunta.nombre_competencia;
            comportamientos = [pregunta.comportamiento];
            preguntas = [pregunta.pregunta];
        }
    }
    return competencias;
}

async function obtenerEmpleados() {
    const empleados = await knex.select('*').from('empleados');
    return empleados;
}

async function obtenerCompetenciaPorId(idCompetencia) {
    const competencia = await knex.select('*').from('competencias').where('id_competencia', idCompetencia);
    const competenciaDatos = await knex.select('*').from('evaluaciones_comportamientos').where('id_competencia', idCompetencia);
    return {id_competencia: competencia[0].id_competencia, nombre_competencia: competencia[0].nombre_competencia, detalles: competenciaDatos}
}

async function obtenerJefes() {
    let jefes = [];
    const rolJefes = await knex.select('*').from('usuarios').where('rol', 1);
    for (const jefe of rolJefes) {
        const empleadoTemp = await knex.select('*').from('empleados').where('id_empleado', jefe.id_empleado);
        console.log(empleadoTemp);
        jefes.push(empleadoTemp);
    }
    
    return jefes;
}

async function getBossByEmployee(bossId) {
    let boss = await knex.select('*').from('empleados').where('id_empleado', bossId);
    [boss] = JSON.parse(JSON.stringify(boss));
    return boss;
}

async function getEmployeesByBoss(bossId) {
    const employees = await knex.select('*').from('empleados').where('id_jefe', bossId);
    return employees;
}

async function obtenerEncuestas() {
    const encuestas = await knex.select('*').from('encuestas').where('activo', 1);
    return encuestas;
}

async function obtenerHabilidadesPorPuesto(idPuesto) {
    const habilidades = await knex.select('*').from('perfil_puesto_habilidades').where('id_pefil_puesto', idPuesto);
    return habilidades;
}

async function obtenerEvaluacion(idHabilidad) {
    const preguntaEvaluacion = await knex.select('*').from('evaluaciones_comportamientos').where('id_habilidad', idHabilidad);
    console.log(preguntaEvaluacion);
    return preguntaEvaluacion;
};

module.exports = {
    obtenerDepartamentos,
    obtenerPuestos,
    obtenerEmpleado,
    getByEmail,
    getById,
    obtenerCompetencias,
    obtenerComportamientosPorCompetencia,
    obtenerEvaluaciones,
    obtenerPreguntas,
    obtenerEmpleados,
    obtenerHabilidades,
    obtenerCompetenciaPorId,
    obtenerJefes,
    getBossByEmployee,
    getEmployeesByBoss,
    obtenerEncuestas,
    obtenerHabilidadesPorPuesto,
    obtenerEvaluacion
};