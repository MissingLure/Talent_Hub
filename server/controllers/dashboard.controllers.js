const dashboardServ = require("../services/dashboard.services");

const getDashboardController = async (req, res) => {
  try {
    const result = await dashboardServ.getDashboardService();

    return res.send({ succes: true, data: result });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const getEmpleadoByIdController = async (req, res) => {
  try {
    const result = await dashboardServ.getEmpleadoService(
      req.params.id_empleado
    );

    if (result.length == 0) {
      return res
        .status(400)
        .send({ succes: false, message: "Empleado no encontrado" });
    }

    return res.send({ succes: true, data: result[0] });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getDepartamentoByIdController = async (req, res) => {
  try {
    const result = await dashboardServ.getDepartamentoService(
      req.params.id_empleado
    );

    if (result.length == 0) {
      return res
        .status(400)
        .send({ succes: false, message: "Departamento no encontrado" });
    }

    return res.send({ succes: true, data: result[0] });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getPuestoByIdController = async (req, res) => {
  try {
    const result = await dashboardServ.getPuestoService(req.params.id_empleado);

    if (result.length == 0) {
      return res
        .status(400)
        .send({ succes: false, message: "Puesto no encontrado" });
    }

    return res.send({ succes: true, data: result[0] });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = {
  getPuestoByIdController,
  getDepartamentoByIdController,
  getEmpleadoByIdController,
  getDashboardController,
};
