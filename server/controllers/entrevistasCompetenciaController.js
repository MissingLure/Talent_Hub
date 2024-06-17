const entrevistasCompetenciaService = require("../services/entrevistasCompetenciaService");

async function obtenerEntrevistas(req, res) {
    try {
        const resultados = await entrevistasCompetenciaService.obtenerTodos();
        res.json(resultados);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener las entrevistas" });
    }
}

async function obtenerEntrevistaPorId(req, res) {
    try {
        const resultado = await entrevistasCompetenciaService.obtenerPorId(req.params.id_entrevistas_competencia);
        if (resultado) {
            res.json(resultado);
        } else {
            res.status(404).send({ message: "Entrevista no encontrada" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error al obtener la entrevista" });
    }
}

async function obtenerEntrevistaPorPuesto(req, res) {
    try {
        const resultado = await entrevistasCompetenciaService.obtenerPorPuesto(req.params.id_perfil_puesto);
        if (resultado) {
            res.json(resultado);
        } else {
            res.status(404).send({ message: "Entrevista no encontrada" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error al obtener la entrevista" });
    }
}

async function insertarEntrevista(req, res) {
    try {
        const nuevaEntrevista = await entrevistasCompetenciaService.insertar(req.body);
        res.status(201).json(nuevaEntrevista);
    } catch (error) {
        res.status(500).send({ message: "Error al insertar la entrevista" });
    }
}

async function actualizarEntrevista(req, res) {
    try {
        const actualizada = await entrevistasCompetenciaService.actualizar(req.params.id_entrevistas_competencia, req.body);
        res.json(actualizada);
    } catch (error) {
        res.status(500).send({ message: "Error al actualizar la entrevista" });
    }
}

async function eliminarEntrevista(req, res) {
    try {
        await entrevistasCompetenciaService.eliminar(req.params.id_entrevistas_competencia);
        res.send({ message: "Entrevista eliminada correctamente" });
    } catch (error) {
        res.status(500).send({ message: "Error al eliminar la entrevista" });
    }
}

module.exports = {
    obtenerEntrevistas,
    obtenerEntrevistaPorId,
    insertarEntrevista,
    actualizarEntrevista,
    eliminarEntrevista,
    obtenerEntrevistaPorPuesto,
};
