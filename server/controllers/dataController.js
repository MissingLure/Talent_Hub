const { response, request } = require("express");
const { obtenerDepartamentos, obtenerPuestos, obtenerEmpleado, obtenerCorreo, obtenerCompetencias, obtenerComportamientosPorCompetencia, obtenerEvaluaciones, obtenerPreguntas, obtenerEmpleados, obtenerHabilidades, getCompetenciaById, obtenerCompetenciaPorId, obtenerJefes, getBossByEmployee, getEmployeesByBoss, obtenerEncuestas, obtenerHabilidadesPorPuesto, obtenerEvaluacion, obtenerUsuario } = require("../services/dataService");
const { async } = require("q");

async function obtener_departamentos(request, response) {
    const errorMessages = [];
    const departamentos = obtenerDepartamentos()
        .then(departamentos => response.send({data: departamentos}));
};
async function obtener_puestos(request, response) {
    const errorMessages = [];
    const puestos = obtenerPuestos()
        .then(puestos => response.send({data: puestos}));
}

async function obtener_empleado(request, response) {
    try {
        const { idEmpleado } = request.body;
        const empleado = await obtenerEmpleado(idEmpleado);
        response.send({ success: true, data: empleado });
    } catch(error) {
        response.status(500).send({ success: false, details: 'Error al obtener el empleado.' });
    }
}

async function obtener_competencias(request, response) {
    try {
        const competencias = await obtenerCompetencias();
        response.send({ success: true, data: competencias });
    } catch(error) {
        response.status(500).send({ success: false, details: 'Error al tratar de obtener datos.' });
    }
}

async function obtener_habilidades(request, response) {
    try {
        const habilidades = await obtenerHabilidades();
        response.send({ success: true, data: habilidades});
    } catch(error) {
        response.status(500).send({ success: false, details: 'Error al tratar de obtener datos.' });
    }
}

async function obtener_comportamientos_por_competencia(request, response) {
    try {
        const idCompetencia = request.query.idCompetencia;
        const comportamientos = await obtenerComportamientosPorCompetencia(idCompetencia);
        response.send({ success: true, data: comportamientos});
    } catch(error) {
        response.status(500).send({ success:false, details: 'Error al tratar de obtener datos.'});
    }
}

async function obtener_evaluaciones(request, response) {
    try {
        const evaluaciones = await obtenerEvaluaciones();
        response.send({ success: true, data: evaluaciones});
    } catch(error) {
        response.status(500).send({ success:false, details: 'Error al tratar de obtener datos.'});
    }
}

async function obtener_preguntas(request, response) {
    try {
        const preguntas = await obtenerPreguntas();
        response.send({ success: true, data: preguntas});
    } catch(error) {
        response.status(500).send({ success: false, details: 'Error al tratar de obtener datos.'});
    }
}

async function obtener_empleados(request, response) {
    try {
        const empleados = await obtenerEmpleados();
        response.send({success: true, data: empleados});
    } catch(error) {
        response.status(500).send({success: false, details: 'Error al tratar de obtener datos.'})
    }
}

async function obtener_usuario(request, response) {
    try {
        const usuario = await obtenerUsuario();
        response.send({success: true, data: usuario});
    } catch(error) {
        response.status(500).send({success: false, details: 'Error al tratar de obtener datos.'})
    }
}

async function obtener_competencia_por_id(request, response) {
    try {
        const idCompetencia = request.body.id_competencia;
        const competencia = await obtenerCompetenciaPorId(idCompetencia);
        response.send({sucess: true, data: competencia});
    } catch(error) {
        response.status(500).send({success: false, details: 'Error al tratar de obtener datos.'})
    }
}

async function obtener_jefes(request, response) {
    try {
        const jefes = await obtenerJefes();
        response.send({success: true, data: jefes});
    } catch(error) {
        response.status(500).send({success: false, details: 'Error al tratar de obtener datos.'})
    }
}

async function get_boss_by_employee(request, response) {
    try {
        const {employeeId} = request.body;
        const boss = await getBossByEmployee(employeeId);
        if(boss) {
            response.send({success: true, data: boss}); 
        } else {
            response.send({success: false, details: 'No se le ha asignado un jefe al empleado.'});
        }
        
    } catch(error) {
        errorMessages.push('Error al tratar de obtener datos.');
        response.status(500).send({success: false, details: errorMessages})
    }
}

async function get_employees_by_boss(request, response) {
    try {
        const {bossId} = request.body;
        const employees = await getEmployeesByBoss(bossId);
        if (employees.length > 0) {
            response.send({success: true, data: employees});
        } else {
            response.send({success: false, data: 'No se encontraron empleados.'});
        }
        
    } catch(error) {
        response.status(500).send({success: false, details: 'Error al tratar de obtener datos.'})
    }
}

async function obtener_puesto_por_id(request, response) {
    const errorMessages = [];
    try {
        const {idPuesto} = request.body;
        const puesto = await getEmployeesByBoss(idPuesto);
        response.send({success: true, data: puesto});
    } catch(error) {
        errorMessages.push('Error al tratar de obtener datos.');
        response.status(500).send({success: false, details: errorMessages})
    }
}

async function obtener_encuestas(request, response) {
    const errorMessages = [];
    try {
        const encuestas = await obtenerEncuestas();
        response.send({success: true, data: encuestas});
    } catch(error) {
        errorMessages.push('Error al tratar de obtener datos.');
        response.status(500).send({success: false, details: errorMessages})
    }
};

async function obtener_habilidades_por_puesto(request, response) {
    const errorMessages = [];
    try {
        const {id_perfil_puesto} = request.body;
        const habilidades = await obtenerHabilidadesPorPuesto(id_perfil_puesto);
        if (habilidades.length > 0) {
            response.send({success: true, data: habilidades});
        } else {
            errorMessages.push('El perfil seleccionado no tiene encuesta asignada.')
            response.send({success: false, details: errorMessages});
        }
    } catch(error) {
        console.log(error);
    }
}

async function obtener_evaluacion(request, response) {
    const errorMessages = [];
    try {
        const evaluaciones = [];
        const {idPuesto} = request.body;
        const habilidades = await obtenerHabilidadesPorPuesto(idPuesto)
        for(const habilidad of habilidades) {
            const evaluacion = await obtenerEvaluacion(habilidad.id_habilidad);
            evaluaciones.push(evaluacion);
        }
        if (evaluaciones.length > 0) {
            response.send({success: true, data: evaluaciones});
        } else {
            errorMessages.push('El perfil seleccionado no tiene encuesta asignada.')
            response.send({success: false, details: errorMessages});
        }
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    obtener_departamentos,
    obtener_puestos,
    obtener_empleado,
    obtener_competencias,
    obtener_comportamientos_por_competencia,
    obtener_evaluaciones,
    obtener_preguntas,
    obtener_empleados,
    obtener_habilidades,
    obtener_competencia_por_id,
    obtener_jefes,
    get_boss_by_employee,
    get_employees_by_boss,
    obtener_puesto_por_id,
    obtener_encuestas,
    obtener_habilidades_por_puesto,
    obtener_evaluacion,
    obtener_usuario
};