const evaluacionesPotencialServ = require("../services/evaluaciones.potencial.services");
const { employeeExists } = require("../controllers/validationController");

const SelectEvalucionesPendientes = async (req, res) => {
    try {
        const result =
            await evaluacionesPotencialServ.SelectEvalucionesPendientes();

        return res.status(200).json({
            message: "Consulta exitosa.",
            data: result,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error en el servidor.",
        });
    }
};

const getEvaluacionesPotencialController = async (req, res) => {
    try {
        const result =
            await evaluacionesPotencialServ.selectEvaluacionesPotencialService();

        return res.status(200).json({
            message: "Consulta exitosa.",
            data: result,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error en el servidor.",
        });
    }
};

const getEvaluacionPotencialController = async (req, res) => {
    try {
        const { idEvaluacionPotencial } = req.params;
        const result =
            await evaluacionesPotencialServ.selectEvaluacionCompetenciasService(
                idEvaluacionPotencial
            );

        if (result.length === 0) {
            return res.status(404).json({
                message: "No se encontro la evaluacion.",
                data: result,
            });
        }

        return res.status(200).json({
            message: "Consulta exitosa.",
            data: result,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error en el servidor.",
        });
    }
};

const postEvaluacionPotencialController = async (req, res) => {
    try {
        const newEvaluacionPotencial = req.body;
        const result =
            await evaluacionesPotencialServ.insertEvaluacionCompetenciasService(
                newEvaluacionCompetencias
            );

        return res.status(201).json({
            message: "Registro exitoso.",
            data: result,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error en el servidor.",
        });
    }
};

const putEvaluacionPotencialController = async (req, res) => {
    try {
        const { idEvaluacionPotencial } = req.params;
        const values = req.body;

        const findEvaluacionPotencial =
            await evaluacionesPotencialServ.selectEvaluacionCompetenciasService(
                idEvaluacionPotencial
            );

        if (findEvaluacionPotencial.length === 0) {
            return res.status(404).json({
                message: "No se ha encontrado la evaluacion.",
                data: findEvaluacionPotencial,
            });
        }

        const result =
            await evaluacionesPotencialServ.updateEvaluacionCompetenciasService(
                idEvaluacionPotencial,
                values
            );

        return res.status(200).json({
            message: "Actualización exitosa.",
            data: result,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error en el servidor.",
        });
    }
};

const deleteEvaluacionPotencialController = async (req, res) => {
    try {
        const { idEvaluacionPotencial } = req.params;

        const findEvaluacionPotencial =
            await evaluacionesPotencialServ.selectEvaluacionCompetenciasService(
                idEvaluacionPotencial
            );

        if (findEvaluacionPotencial.length === 0) {
            return res.status(404).json({
                message: "No se ha encontrado la evaluacion.",
                data: findEvaluacionPotencial,
            });
        }

        const result =
            await evaluacionesPotencialServ.deleteEvaluacionCompetenciasService(
                idEvaluacionPotencial
            );

        return res.status(200).json({
            message: "Eliminación exitosa.",
            data: result,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error en el servidor.",
        });
    }
};

const getEvaluacionesPotencialByEmpleadoController = async (req, res) => {
    try {
        const { idEmpleado } = req.params;

        // Validar si el empleado existe
        

        const result = await evaluacionesPotencialServ.selectEvaluacionPotencialByEmpleadoService(idEmpleado);

        if (!result || result.length === 0) {
            return res.status(404).json({
                message: "No se encontraron datos.",
                data: result,
            });
        }

        return res.status(200).json({
            message: "Consulta exitosa.",
            data: result,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error en el servidor.",
        });
    }
};

module.exports = {
    getEvaluacionesPotencialController,
    getEvaluacionPotencialController,
    postEvaluacionPotencialController,
    putEvaluacionPotencialController,
    deleteEvaluacionPotencialController,
    getEvaluacionesPotencialByEmpleadoController,
    SelectEvalucionesPendientes,
};
