const { response, request } = require("express");
const { asignarJefe } = require("../services/updateService");
const { emptyFields } = require("../utils/validator");

async function asignar_jefe(request, response) {
    try {
        const {employeeId, bossId} = request.body;

        const data = {
            employeeId: employeeId,
            bossId: bossId,
        };

        if (emptyFields(data).length > 0) {
            response.send({ success: false, details: 'No pueden haber campos vacíos.' });
        } else {
            const result = await asignarJefe(employeeId, bossId);
            response.send({success: true, details: 'Jefe asignado exitosamente.'})
        }
    } catch(error) {
        response.status(500).send({ success: false, details: 'Error al tratar de actualizar datos.' });
        console.log('ERROR DE SERVIDOR.');
    }
    
};

module.exports = {
    asignar_jefe,
};