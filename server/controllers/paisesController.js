const paisesService = require("../services/paisesService");

async function GetAllPais(req, res) {
    try {
      const resultados = await paisesService.GetAllPais();
      res.json(resultados);
    } catch (err) {
      res.status(500).send({ message: "Error al obtener los resultados" });
    }
  }

  async function insertarPais(req, res) {
    try {
      const nuevoResultado = await paisesService.insertarPais(req.body);
      res.status(201).json(nuevoResultado);
    } catch (err) {
      res.status(500).send({ message: "Error al insertar el resultado" });
    }
  }

  module.exports = {
    GetAllPais,
    insertarPais,
  };