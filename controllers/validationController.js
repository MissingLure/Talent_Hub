const { getByEmail, getById } = require("../services/dataService");

async function employeeExists(identidad) {
    try {
        const result = await getById(identidad);
        return result.length > 0;
    } catch(error) {
        console.log(error);
    }
}

async function emailExists(correo) {
    try {
        const result = await getByEmail(correo);
        return result.length > 0;
    } catch(error) {
        console.log(error);
    }
};

module.exports = {
    emailExists,
    employeeExists
};