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

async function agregarEmpleado(empleado) {
    try {
        const result = await knex.raw('EXEC CrearEmpleado ?,?,?,?,?,?,?,?,?,?,?', [
            empleado.primer_nombre,
            empleado.segundo_nombre,
            empleado.primer_apellido,
            empleado.segundo_apellido,
            empleado.telefono,
            empleado.numero_identidad,
            empleado.direccion,
            empleado.correo,
            empleado.fecha_nacimiento,
            empleado.id_perfil_puesto,
            empleado.id_departamento
        ]);
        return result;
    } catch(error) {
        console.log(error);
        return false;
    }
    
};

async function crearUsuario(usuarioData) {
    try {
        const result = await knex('usuarios').insert(usuarioData);
        return result;
    } catch(error) {
        console.log(error);
        return false;
    }
};

async function crearEvaluacion(evaluacionData) {
    try {
    } catch(error) {
        console.log(error);
    }
}

async function crearCompetencia(competenciaData){
    try {
        const result = await knex('competencias').insert(competenciaData);
    } catch(error) {
        console.log(error);
    }
}

async function crearPregunta(preguntaData) {
    try {
        const result = await knex('evaluaciones_comportamientos').insert(preguntaData);
        return result;
    } catch(error) {
        return false;
    }
}

async function crearEncuesta(encuestaData) {
    try {
        const result = await knex.raw('DECLARE @NuevoID INT; EXEC dbo.InsertarEncuesta ?, ?, ?, @NuevoID OUTPUT; SELECT @NuevoID AS IDGenerado', [
            encuestaData.tipo_encuesta,
            encuestaData.nombre_encuesta,
            encuestaData.lenguaje
        ]);
    
        //const nuevoID = result[0][0].NuevoID;
        return(result[0].IDGenerado);
    } catch (error) {
        console.error(error);
    }
};

async function crearPreguntaEncuesta(preguntaData) {
    try {
        const result = await knex('preguntas').insert(preguntaData);    
        return result;
    } catch (error) {
        console.error(error);
    }
};

async function insertarHabilidades(habilidadData) {
    try {
        const result = await knex('perfil_puesto_habilidades').insert(habilidadData);
    } catch(error) {
        console.log(error);
    }
};

module.exports = {
    agregarEmpleado,
    crearUsuario,
    crearCompetencia,
    crearPregunta,
    crearEncuesta,
    crearPreguntaEncuesta,
    insertarHabilidades
};